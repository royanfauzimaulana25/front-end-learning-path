class Utils {
    static emptyElement(element) {
      element.innerHTML = '';
    }  
  
    static isValidInteger(newValue) {
      return Number.isNaN(newValue) || Number.isFinite(newValue);
    }

    static showElement(element) {
      element.style.display = 'block';
      element.hidden = false;
    }
  
    static hideElement(element) {
      element.style.display = 'none';
      element.hidden = true;
    }
  }
  
  export default Utils;
  