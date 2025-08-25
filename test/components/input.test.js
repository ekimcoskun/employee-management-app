import { describe, it, expect } from "vitest";
import "../../src/components/shared/Input/input.js";

function nextTick() {
  return new Promise((resolve) => setTimeout(resolve));
}

describe("AppInput", () => {
  it("renders label and value", async () => {
    document.body.innerHTML = `<app-input label="First Name" value="Ekim"></app-input>`;
    const el = document.querySelector("app-input");
    await nextTick();
    const shadow = el.shadowRoot;
    expect(shadow.querySelector("label").textContent).toBe("First Name");
    expect(shadow.querySelector("input").value).toBe("Ekim");
  });

  it("shows error message", async () => {
    document.body.innerHTML = `<app-input error="Error message"></app-input>`;
    const el = document.querySelector("app-input");
    await nextTick();
    const shadow = el.shadowRoot;
    expect(shadow.querySelector(".error").textContent).toBe("Error message");
  });

  it("input type is set", async () => {
    document.body.innerHTML = `<app-input type="password"></app-input>`;
    const el = document.querySelector("app-input");
    await nextTick();
    const shadow = el.shadowRoot;
    expect(shadow.querySelector("input").type).toBe("password");
  });

  it("dispatches input-change event on input", async () => {
    document.body.innerHTML = `<app-input></app-input>`;
    const el = document.querySelector("app-input");
    await nextTick();
    const shadow = el.shadowRoot;
    let eventCaught = false;
    el.addEventListener("input-change", (e) => {
      eventCaught = true;
      expect(e.detail.value).toBe("Yeni değer");
      expect(el.value).toBe("Yeni değer");
    });
    const input = shadow.querySelector("input");
    input.value = "Yeni değer";
    input.dispatchEvent(new Event("input"));
    expect(eventCaught).toBe(true);
  });

  it("does not render error if error prop is empty", async () => {
    document.body.innerHTML = `<app-input></app-input>`;
    const el = document.querySelector("app-input");
    await nextTick();
    const shadow = el.shadowRoot;
    expect(shadow.querySelector(".error")).toBeNull();
  });
});
