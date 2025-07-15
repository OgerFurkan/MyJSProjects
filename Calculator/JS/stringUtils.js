// String/Mat Validation kodları


/**
 * 
 * Nokta kontrolü
 * @param {string} str
 * @returns {boolean}
 */
export function dotValidation(str) {
   let array = str.split(" ");
   for(let i=0; i<array.length;i++){
        let counter=0;
        let j=0;
        while(j<array[i].length){
            if(array[i][j]=="."){
                counter++
            }
             j++
        }
        if(counter>1){
            return false;
        }
        if(i==array.length-1){
            if(isNaN(array[i][array[i].length-2])){
                return false
            }
        }
   }
   return true;
}

/**
 * Operatör kontrolü
 * @param {string} str
 * @returns {boolean}
 */
export function operatorValidation(str) {
   let array = str.split(" ");
   let length= array.length;
    if(length<=1){
        if(isNaN(array[0][array[0].length-1])){
         return false
        }
    }
    else{
        if(isNaN(array[length-1][array[length-1].length-1])){
            return false
        }
    }
    
   
    return true;
}

/**
 * Hesaplama
 * @param {string} str
 * @returns {Number}
 */

export function calculate(str){
    let temp=str.replace(/×/g, "*").replace(/÷/g,"/");
    let fixed= temp.split(" ")
    for(let i=0;i<fixed.length;i++){
        if(fixed[i][0]=="0" && fixed[i][1]!=","){
            let k=1;
            while(fixed[i][k]=="0"){
                k++
            }
            fixed[i]=fixed[i].slice(k) 
        }
    }
    let result;
    try {
        result = eval(fixed.join(""));
    } catch (e) {
        result = NaN;
    }
    return result.toFixed(1)
}