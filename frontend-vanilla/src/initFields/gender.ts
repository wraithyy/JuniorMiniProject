export default function initGenderField() {
    function func(){
        const selected = document.querySelector<HTMLInputElement>('input[name="gender"]:checked');

        if (!selected) {
            console.warn("No gender selected");
            return  "";
        }
        return  selected.value;
    }
    return () => func();
}