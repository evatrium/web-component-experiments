import {PWC, x} from "../core/PWC";
import {h, Fragment, Component, render} from "preact";
import {hashCustomElement, randomName} from "./testUtils/atomicoUtil";

const till = async (time) => new Promise(resolve => setTimeout(resolve, time || 300));

//https://github.com/jsdom/jsdom/issues/1030


const propTypes = {
  string: String,
  number: Number,
  boolean: Boolean,
  object: Object,
  array: Array,
  date: Date
};

class CustomElement extends PWC {
  static propTypes = propTypes;

  render() {
    return (
      <h1>derp</h1>
    );
  }
}

let innerRootExample = hashCustomElement(CustomElement);

describe("PWC base class", () => {


  it("renders a preact functional component", async (done) => {

    const tag = randomName();

    const Rando = x(tag, (props) => {
      return <h1>X!</h1>
    });

    let mountingPoint = document.createElement('div');

    document.body.appendChild(mountingPoint)

    render(<Rando/>, mountingPoint);

    let elem = document.getElementsByTagName('x-' + tag)[0];

    await elem._mounted;

    expect(mountingPoint.innerHTML).toBe(`<x-${tag}></x-${tag}>`);

    expect(elem.shadowRoot.innerHTML).toBe('<h1>PWC!</h1>');

    done();

  });

  it("renders a preact class component", async (done) => {

    const tag = randomName();

    const Rando = x(tag, class extends Component {
      render() {
        return <h1>X!</h1>
      }
    });

    let mountingPoint = document.createElement('div');

    document.body.appendChild(mountingPoint);

    render(<Rando/>, mountingPoint);

    let elem = document.getElementsByTagName('x-' + tag)[0];

    await elem._mounted;

    expect(mountingPoint.innerHTML).toBe(`<x-${tag}></x-${tag}>`);

    expect(elem.shadowRoot.innerHTML).toBe('<h1>PWC!</h1>');

    done();

  });


  it("passes attributes as props to the preact component and reflects the attributes", async (done) => {

    const tag = randomName();


    const Rando = x(tag, (props) => {
      return <div>{props.testValue}</div>
    }, {testValue: String});

    let mountingPoint = document.createElement('div');

    document.body.appendChild(mountingPoint);

    render(<Rando test-value={'initial'}/>, mountingPoint);

    let elem = document.getElementsByTagName('x-' + tag)[0];

    await till();

    expect(mountingPoint.innerHTML).toBe(`<x-${tag} test-value="initial" class="___"></x-${tag}>`);

    expect(elem.getAttribute('test-value')).toBe('initial');

    expect(elem.shadowRoot.innerHTML).toBe('<div>initial</div>');


    elem.setAttribute('test-value', 'updated')

    await elem._process;

    await till(); //

    expect(mountingPoint.innerHTML).toBe(`<x-${tag} test-value="updated" class="___"></x-${tag}>`);

    console.log(elem.shadowRoot.innerHTML)

    expect(elem.shadowRoot.innerHTML).toBe('<div>updated</div>');

    done();

  });



  it("Test field type string", async done => {
    let node = innerRootExample('string="hello"');

    await node._mounted;

    expect(node.string).toBe('hello');

    done()
  });

  it("Test field type number", async done => {
    let node = innerRootExample(`number="100"`);

    await node._mounted;

    expect(node.number).toBe(100);

    done();
  });


  it("Test field type boolean", async done => {
    let node = innerRootExample(`boolean`);

    await node._mounted;

    expect(node.boolean).toBe(true);

    done();
  });
  it("Test field type object", async done => {
    let node = innerRootExample(`object='{"field":true}'`);

    await node._mounted;

    expect(node.object).toEqual({field: true});

    done();
  });

  it("Test field type array", async done => {
    let node = innerRootExample(`array='[]'`);

    await node._mounted;

    expect(node.array).toEqual(jasmine.any(Array));

    done();
  });

  it("Test field type date", async done => {
    let time = "2020-01-01";
    let node = innerRootExample(`date='${time}'`);

    await node._mounted;

    expect(node.date).toEqual(jasmine.any(Date));

    expect(new Date(time) + "").toBe(node.date + "");

    done();
  });

});
