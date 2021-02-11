class StringUtils {
  
    async replaceTemplateString(regEx, str, newValue) {
      return await str.replace(regEx, newValue);
    }

    async splitStringByRegEx(regEx, str, index){
      let splittedStringArrays = str.split(regEx);
      if(index < 0){
        throw new Error("Index value should not be negative");
      }else if(index > splittedStringArrays.length - 1){
        throw new Error("Index value is bigger than the size of splitted string");
      }else return str.split(regEx)[index];
    }

    async matchStringByRegEx(regEx, str, index){
      let matchedStringArrays = str.match(regEx);
      if(index < 0){
        throw new Error("Index value should not be negative");
      }else if(index > matchedStringArrays.length){
        throw new Error("Index value is bigger than the size of matched string");
      }else return matchedStringArrays[index];
    }
  }
  
  module.exports = new StringUtils();