export const toArray = (stringArray) => stringArray?.replace(/\[|\]/g, "").split(",");
export const jsonParser=(json)=> JSON.parse(json);