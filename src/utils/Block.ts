import { EventBus } from "./EventBus";
import { nanoid } from 'nanoid';

class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  } as const;

  public id = nanoid(6);
  public props: P;
  public children: Record<string, Block>;
  public childrenCollection: Record<string, Array<Block>>;
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;
  private _meta: { tagName: string; props: P; };

  constructor(tagName = "div", propsWithChildren = {}) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren as P);
    this._meta = {
      tagName,
      props: props
    };

    this.children = children;
    this.props = this._makePropsProxy(props);
    this.childrenCollection = this._makeChildrenCollectionProxy({});

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps: P): { props: P, children: Record<string, Block>} {
    const props: Record<string, unknown> = {};
    const children: Record<string, Block> = {};
    if(childrenAndProps) {
      Object.entries(childrenAndProps).forEach(([key, value]) => {
        if (value instanceof Block) {
          children[key] = value;
        } else {
          props[key] = value;
        }
      });
    }
    return { props: props as P, children };
  }

  _addEvents() {
    const {events = {}} = this.props as P & { events: Record<string, () => void> };

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _init() {
    this._createResources();

    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() { /* This gets rewritten by things that extend Block  */ }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() { /* This gets rewritten by things that extend Block */ }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
  }

  private _componentDidUpdate() {
    if (this.componentDidUpdate()) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate() {
    return true;
  }

  setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();

    this._element!.innerHTML = '';
    if(fragment) {
      this._element!.append(fragment);
    }
    this._addEvents();
  }

  protected compile(template: (context: Record<string, any>) => string, context: Record<string, any>) {
    const contextAndStubs = { ...context };
    if(contextAndStubs) {
      Object.entries(this.children).forEach(([name, component]) => {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      });
    }
    for(const childrencollection in this.childrenCollection) {
      for(const newchild of this.childrenCollection[childrencollection]) {
        if(!contextAndStubs[childrencollection]) contextAndStubs[childrencollection] = [];
        contextAndStubs[childrencollection].push(`<div data-id="${newchild.id}"></div>`);
      }
    }
    const html = template(contextAndStubs);
    const temp = document.createElement('template');

    temp.innerHTML = html;
    Object.entries(this.children).forEach(([_, component]) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }
    
      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    });
    
    for(const childrencollection in this.childrenCollection) {
      for(const newchild of this.childrenCollection[childrencollection]) {
        const stub = temp.content.querySelector(`[data-id="${newchild.id}"]`);
        if (!stub) {
          return;
        }
        newchild.getContent()?.append(...Array.from(stub.childNodes));
        stub.replaceWith(newchild.getContent()!);
      }
    }
    return temp.content;
  }

  protected render(): string | Node | undefined {
    return new DocumentFragment() as string | Node | undefined;
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: P) {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target }

        target[prop as keyof P] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }
  _makeChildrenCollectionProxy(childrenCollection: Record<string, any>) {
    const self = this;

    return new Proxy(childrenCollection, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target }

        target[prop as string] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }
  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent()!.style.display = "block";
  }

  hide() {
    this.getContent()!.style.display = "none";
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onSubmit(_data: Record<string, any>, _submitType: string) { /* This gets rewritten by things that extend Block  */ }

}

export default Block;