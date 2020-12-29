class StringUtils {
  
    async replaceTemplateString(regEx, string, newValue) {
      return String(string.replace(regEx, newValue));
    }

    async splitStringByRegEx(regEx, string, index){
      let splittedStringArrays = string.split(regEx);
      if(index < 0){
        throw new Error("Index value should not be negative");
      }else if(index > splittedStringArrays.length - 1){
        throw new Error("Index value is bigger than the size of splitted string");
      }else return string.split(regEx)[index];
    }
  }
  
  module.exports = new StringUtils();