import React from "react";
import {Store} from 'cx/data';
import {Controller} from 'cx/ui';
import {startAppLoop} from "./startAppLoop";
import {Button} from "cx/widgets";

const store = new Store();

class PageController extends Controller {
    onInit() {
        this.store.init('message', 'Hello, World!');
    }
}

const App = () => (
    <cx>
        <div controller={PageController}>
            <h1 text-bind="message"></h1>
            <Button onClick={(e: any, {store}: { store: any }) => {
                store.set('message', 'Hello, CxJS!');
            }}>Click me</Button>
        </div>
    </cx>
);

window.onload = function () {
    startAppLoop(document.getElementById('app'), store, App);
}

