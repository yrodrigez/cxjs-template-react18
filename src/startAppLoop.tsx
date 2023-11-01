import React from "react";
import {createRoot} from "react-dom/client";
import {unmountComponentAtNode} from "react-dom";
import {Store} from "cx/data";
import {Cx} from "cx/ui";

interface StartAppLoopOptions {
    destroyDelay?: number;
    removeParentDOMElement?: boolean;
}

export function startAppLoop(parentDOMElement: any, storeOrInstance: any, widget: any, options: StartAppLoopOptions = {}) {
    if (!parentDOMElement || parentDOMElement.nodeType !== 1)
        throw new Error('First argument to startAppLoop should be a valid DOM element.');

    let store, instance, parentInstance;
    if (!storeOrInstance) storeOrInstance = new Store();

    if (storeOrInstance.notify) store = storeOrInstance;
    else if (storeOrInstance.getChild) {
        if (storeOrInstance.widget === widget) instance = storeOrInstance;
        else parentInstance = storeOrInstance;
    } else throw new Error('Second argument to startAppLoop should be either of type Store or Instance');

    let root = createRoot(parentDOMElement);
    let cxRoot = (
        <Cx
            store={store}
            widget={widget}
            instance={instance}
            parentInstance={parentInstance}
            options={options}
            subscribe
        />
    );
    root.render(cxRoot);

    let stopped = false;
    return function () {
        if (stopped) return;
        stopped = true;
        if (!options.destroyDelay) destroy(parentDOMElement, options);
        else {
            setTimeout(() => {
                destroy(parentDOMElement, options);
            }, options.destroyDelay)
        }
    }

    function destroy(parentDOMElement: any, options: any) {
        unmountComponentAtNode(parentDOMElement);
        if (options.removeParentDOMElement && parentDOMElement.parentNode)
            parentDOMElement.parentNode.removeChild(parentDOMElement);
    }
}
