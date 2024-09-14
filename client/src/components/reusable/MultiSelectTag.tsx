import "@/styles/multiselecttag.css";
import { type MultiSelectTagOptions, type Option } from "types/types";

// Author: Habib Mhamadi
// Email: habibmhamadi@gmail.com

export default function MultiSelectTag(el: string, customs: MultiSelectTagOptions = { shadow: false, rounded: true }) {
  // Initialize variables
  let element: HTMLSelectElement | null = null,
    options: Option[] = [],
    customSelectContainer: HTMLElement | null = null,
    wrapper: HTMLElement | null = null,
    btnContainer: HTMLElement | null = null,
    body: HTMLElement | null = null,
    inputContainer: HTMLElement | null = null,
    inputBody: HTMLElement | null = null,
    input: HTMLInputElement | null = null,
    button: HTMLButtonElement | null = null,
    drawer: HTMLElement | null = null,
    ul: HTMLElement | null = null;

  // Customize tag colors
  const tagColor = customs.tagColor || {};
  tagColor.textColor = tagColor.textColor || "#FF5D29";
  tagColor.borderColor = tagColor.borderColor || "#FF5D29";
  tagColor.bgColor = tagColor.bgColor || "#FFE9E2";

  // Initialize DOM Parser
  const domParser = new DOMParser();

  // Initialize
  init();

  function init() {
    // DOM element initialization
    element = document.getElementById(el) as HTMLSelectElement;
    createElements();
    initOptions();
    enableItemSelection();
    setValues(false);

    // Event listeners
    const toggleDrawer = () => {
      if (drawer!.classList.contains("hidden")) {
        initOptions();
        enableItemSelection();
        drawer!.classList.remove("hidden");
        input!.focus();
      } else {
        drawer!.classList.add("hidden");
      }
    };

    button!.addEventListener("click", toggleDrawer);
    inputContainer!.addEventListener("click", toggleDrawer);

    input!.addEventListener("keyup", (e) => {
      initOptions((e.target as HTMLInputElement).value);
      enableItemSelection();
    });

    input!.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !(e.target as HTMLInputElement).value && inputContainer!.childElementCount > 1) {
        const child = body!.children[inputContainer!.childElementCount - 2].firstChild as HTMLElement;
        const option = options.find((op) => op.value == child.dataset.value);
        if (option) {
          option.selected = false;
          removeTag(child.dataset.value!);
          setValues();
        }
      }
    });

    window.addEventListener("click", (e) => {
      if (!customSelectContainer!.contains(e.target as Node)) {
        if (
          (e.target as HTMLElement).nodeName !== "LI" &&
          (e.target as HTMLElement).getAttribute("class") !== "input_checkbox"
        ) {
          // hide the list option only if we click outside of it
          drawer!.classList.add("hidden");
        } else {
          // enable again the click on the list options
          enableItemSelection();
        }
      }
    });
  }

  function createElements() {
    // Create custom elements
    options = getOptions();
    element!.classList.add("hidden");

    // .multi-select-tag
    customSelectContainer = document.createElement("div");
    customSelectContainer.classList.add("mult-select-tag");

    // .container
    wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    // body
    body = document.createElement("div");
    body.classList.add("body");
    if (customs.shadow) {
      body.classList.add("shadow");
    }
    if (customs.rounded) {
      body.classList.add("rounded");
    }

    // .input-container
    inputContainer = document.createElement("div");
    inputContainer.classList.add("input-container");

    // input
    input = document.createElement("input");
    input.classList.add("input");
    input.placeholder = `${customs.placeholder || "Search..."}`;

    inputBody = document.createElement("div");
    inputBody.classList.add("input-body");
    inputBody.append(input);

    body.append(inputContainer);

    // .btn-container
    btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");

    // button
    button = document.createElement("button");
    button.type = "button";
    btnContainer.append(button);

    const icon = domParser.parseFromString(
      `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 21 6 15"></polyline>
            </svg>`,
      "image/svg+xml"
    ).documentElement;

    button.append(icon);

    body.append(btnContainer);
    wrapper.append(body);

    drawer = document.createElement("div");
    drawer.classList.add(...["drawer", "hidden"]);
    if (customs.shadow) {
      drawer.classList.add("shadow");
    }
    if (customs.rounded) {
      drawer.classList.add("rounded");
    }
    drawer.append(inputBody);
    ul = document.createElement("ul");

    drawer.appendChild(ul);

    customSelectContainer.appendChild(wrapper);
    customSelectContainer.appendChild(drawer);

    // Place TailwindTagSelection after the element
    if (element?.nextSibling) {
      element.parentNode!.insertBefore(customSelectContainer, element.nextSibling);
    } else {
      element?.parentNode!.appendChild(customSelectContainer);
    }
  }

  function createElementInSelectList(option: Option, val: string | null, selected: boolean = false) {
    // Create a <li> elmt in the drop-down list,
    // selected parameters tells if the checkbox need to be selected and the bg color changed
    const li = document.createElement("li");
    li.innerHTML = "<input type='checkbox' style='margin:0 0.5em 0 0' class='input_checkbox'>"; // add the checkbox at the left of the <li>
    li.innerHTML += option.label;
    li.dataset.value = option.value;
    const checkbox = li.firstChild as HTMLInputElement;
    checkbox.dataset.value = option.value;

    // For search
    if (val && option.label.toLowerCase().startsWith(val.toLowerCase())) {
      ul!.appendChild(li);
    } else if (!val) {
      ul!.appendChild(li);
    }

    // Change bg color and checking the checkbox
    if (selected) {
      li.style.backgroundColor = tagColor.bgColor!;
      checkbox.checked = true;
    }
  }

  function initOptions(val: string | null = null) {
    ul!.innerHTML = "";
    for (const option of options) {
      // if option already selected
      if (option.selected) {
        !isTagSelected(option.value) && createTag(option);

        // We create a option in the list, but with different color
        createElementInSelectList(option, val, true);
      } else {
        createElementInSelectList(option, val);
      }
    }
  }

  function createTag(option: Option) {
    // Create and show selected item as tag
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item-container");
    itemDiv.style.color = tagColor.textColor || "#2c7a7b";
    itemDiv.style.borderColor = tagColor.borderColor || "#81e6d9";
    itemDiv.style.background = tagColor.bgColor || "#e6fffa";
    const itemLabel = document.createElement("div");
    itemLabel.classList.add("item-label");
    itemLabel.style.color = tagColor.textColor || "#2c7a7b";
    itemLabel.innerHTML = option.label;
    itemLabel.dataset.value = option.value;
    const itemClose = domParser.parseFromString(
      `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="item-close-svg">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>`,
      "image/svg+xml"
    ).documentElement;

    itemClose.addEventListener("click", () => {
      const unselectOption = options.find((op) => op.value == option.value);
      if (unselectOption) {
        unselectOption.selected = false;
        removeTag(option.value);
        initOptions();
        setValues();
      }
    });

    itemDiv.appendChild(itemLabel);
    itemDiv.appendChild(itemClose);
    inputContainer!.append(itemDiv);
  }

  function enableItemSelection() {
    // Add click listener to the list items
    for (const li of ul!.children) {
      li.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        const option = options.find((o) => o.value == target.dataset.value);
        if (option) {
          if (!option.selected) {
            // if the option is not selected, we select it
            option.selected = true;
            input!.value = "";
            initOptions();
            setValues();
          } else {
            // if it's already selected, we deselect it
            option.selected = false;
            input!.value = "";
            initOptions();
            setValues();
            removeTag(target.dataset.value!);
          }
        }
      });
    }
  }

  function isTagSelected(val: string) {
    // If the item is already selected
    for (const child of inputContainer!.children) {
      if (!child.classList.contains("input-body") && (child.firstChild as HTMLElement).dataset.value == val) {
        return true;
      }
    }
    return false;
  }

  function removeTag(val: string) {
    // Remove selected item
    for (const child of inputContainer!.children) {
      if (!child.classList.contains("input-body") && (child.firstChild as HTMLElement).dataset.value == val) {
        inputContainer!.removeChild(child);
      }
    }
  }

  function setValues(fireEvent: boolean = true) {
    // Update element final values
    const selected_values: { label: string; value: string }[] = [];
    for (let i = 0; i < options.length; i++) {
      element!.options[i].selected = options[i].selected;
      if (options[i].selected) {
        selected_values.push({ label: options[i].label, value: options[i].value });
      }
    }
    if (fireEvent && Object.prototype.hasOwnProperty.call(customs, "onChange")) {
      customs.onChange!(selected_values);
    }
  }

  function getOptions(): Option[] {
    // Map element options
    return [...element!.options].map((op) => {
      return {
        value: op.value,
        label: op.label,
        selected: op.selected,
      };
    });
  }
}
