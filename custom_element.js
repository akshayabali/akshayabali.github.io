// To debug this code, open wixDefaultCustomElement.js in Developer Tools.

const IMAGE_URL = "http://wix.to/vUBXBKU";
const H2_TEXT = "This is a Custom Element";
const H3_1_TEXT = "View its code by clicking the Settings button and pasting the Server URL into a new browser tab.";
const H3_2_TEXT = "Explore this code and use it as a reference to create your own element.";
const DEBUG_TEXT = "Loading the code for Custom Element 'wix-default-custom-element'. To debug this code, open wixDefaultCustomElement.js in Developer Tools.";

const all_text = {
    "tree_description_1": "Fig 1: This flow chart offers guidance on classifying these engineered \
        systems and identifying their most practical applications. Mouse over to \
        system classifications (A to F) and decision points for their definitions.",

    "tree_description_2": "*Filter using the engineered system classification.",

    "venn_description_1": "Fig 2: This Venn diagram categorizes research papers into the fields of microfluidics, \
        synthetic biology, electronics, or any combination thereof. Mouse \
        over to El, IC, Bio, and uF for their definitions.",

    "venn_description_2": "*Filter using the Venn diagram for different fields",

    "graph_description_1": "Fig 3: This dynamic graph illustrates how published papers on various engineered \
        system classifications are interconnected through citations. ",

    "graph_description_2": "*Filter using the graph for different classifications",

    "spider_description_1": "Fig 4: This spider-web diagram compares engineered system classifications based on \
        key performance metrics: precision, deployability, cost-effectiveness, disposability, \
        and integration level. Mouse over to Spider-web metrics for their definitions.",
}

function createElementFromObject(obj) {
    const element = document.createElement(obj.type);

    // Parse all keys except children and apply them to the element
    Object.keys(obj).forEach(key => {
        if (key !== "children" && key !== "type") {
            element[key] = obj[key];
        }
    });

    if (obj.children) {
        obj.children.forEach(child => {
            element.appendChild(createElementFromObject(child));
        });
    }

    return element;
}

class WixDefaultCustomElement extends HTMLElement {
    constructor() {
        super();
        console.log(DEBUG_TEXT);
    }

    connectedCallback() {
        this.appendChild(createElementFromObject(div_list));
    }
}
customElements.define("wix-default-custom-element", WixDefaultCustomElement);
