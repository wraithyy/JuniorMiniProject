export default function initGenderField(root: ParentNode) {
  function func() {
    const selected = root.querySelector<HTMLInputElement>(
      'input[name="gender"]:checked'
    );

    if (!selected) {
      console.warn("No gender selected");
      return "";
    }
    return selected.value;
  }
  return () => func();
}
