import React from "react";
import {Store} from 'cx/data';
import {Controller} from 'cx/ui';
import {startAppLoop} from "./startAppLoop";
import {Button, Grid, Section} from "cx/widgets";
// @ts-ignore
import style from "./index.scss";

style?.use();
// @ts-ignore
import {applyThemeOverrides} from "cx-theme-space-blue";

applyThemeOverrides();


const store = new Store();
const fakeData = [
    {id: 1, name: 'John Doe', age: 25, city: 'New York'},
    {id: 2, name: 'Jane Doe', age: 30, city: 'Los Angeles'},
    {id: 3, name: 'Michael Smith', age: 35, city: 'Chicago'},
    // ... otros registros
]

class PageController extends Controller {
    onInit() {
        this.store.init('message', 'Hello, World!');
        this.store.init('$page.records', fakeData);
    }
}

const App = () => (
    <cx>
        <div controller={PageController}>
            <h1 text-bind="message"></h1>
            <Button onClick={(e: any, {store}: { store: any }) => {
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

window.onload = function () {
    startAppLoop(document.getElementById('app'), store, App);
}

