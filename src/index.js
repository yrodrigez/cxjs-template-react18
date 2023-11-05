import {Store} from 'cx/data';
import {Controller} from 'cx/ui';
import {startAppLoop} from "./startAppLoop";
import {Button, Grid, Section} from "cx/widgets";
import "./index.scss";

import {applyThemeOverrides} from "cx-theme-space-blue";

applyThemeOverrides();


const store = new Store();
const fakeData = [
  {id: 1, name: 'John Doe', age: 25, city: 'New York'},
  {id: 2, name: 'Jane Doe', age: 30, city: 'Los Angeles'},
  {id: 3, name: 'Michael Smith', age: 35, city: 'Chicago'},
]

class PageController extends Controller {
  onInit() {
    if (super.init) super.init();
    this.store.init('message', 'Hello, World!');
    this.store.init('$page.records', fakeData);
  }
}

const App = () => (
  <cx>
    <div controller={PageController}>
      <h1 text-bind="message"></h1>
      <Button className="bg-slate-600" onClick={(e, {store}) => {
        store.set('message', 'Hello, CxJS!');
      }}>Click me</Button>
      <Section mod="well">
        <Grid
          records-bind="$page.records"
          style={{width: "100%"}}
          columns={[
            {field: 'id', header: 'ID'},
            {field: 'name', header: 'Name'},
            {field: 'age', header: 'Age'},
            {field: 'city', header: 'City'},
          ]}
        />
      </Section>
    </div>
  </cx>
);


window.addEventListener('resize', () => {
  document.body.style.height = window.innerHeight + 'px';
})

window.addEventListener('load', function () {
  document.body.style.height = window.innerHeight + 'px';
  startAppLoop(document.getElementById('app'), store, App);
})

