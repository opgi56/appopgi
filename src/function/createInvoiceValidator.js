// export function validateSenderStreetAddress(streetAddress) {
//     if (!streetAddress.trim()) {
//       return false;
//     }
//     return true;
//   }
//   // export function validateSenderCity(city) {
//   //   if (!city.trim()) {
//   //     return false;
//   //   }
//   //   return true;
//   // }
//   export function validateInvoicenumber(invoicenumber) {
//     if (!invoicenumber.trim()) {
//       return false;
//     }
//     return true;
//   }
  

//   export function validateSenderPostCode(postCode) {
//     return /^\d{5}(-\d{4})?$/.test(postCode); // Basic post code validation
//   }
//   // export function validateSenderCountry(country) {
//   //   if (!country.trim()) {
//   //     return false;
//   //   }
//   //   return true;
//   // }
  
//   export function validateCLientName(name) {
//     return /^[a-zA-Z]+$/.test(name); // Only allow letters
//   }
//   export function validateCLientPhone(phone) {
//     if (!phone.trim()) {
//       return false;
//     }
//     return true; // Basic email validation
//   }
  
//   export function validateClientStreetAddress(streetAddress) {
//     if (!streetAddress.trim()) {
//       return false;
//     }
//     return true;
//   }
//   export function validateClientCity(city) {
//     if (!city.trim()) {
//       return false;
//     }
//     return true;
//   }
//   export function validateStatus(clientstatus) {
//     if (!clientstatus.trim()) {
//       return false;
//     }
//     return true; // Basic post code validation
//   }
//   export function validateClientCountry(country) {
//     if (!country.trim()) {
//       return false;
//     }
//     return true;
//   }
  
//   export function validateItemName(itemName) {
//     if (!itemName.trim()) {
//       return false;
//     }
//     return true;
//   }
//   export function validateItemPrice(itemPrice) {
//     if (itemPrice <= 0) {
//       return false;
//     }
//     return true;
//   }
//   export function validateItemCount(itemCount) {
//     if (itemCount <= 0) {
//       return false;
//     }
//     return true;
//   }
//   export function validateItemCount1(itemCount1) {
//     if (itemCount1 <= 0) {
//       return false;
//     }
//     return true;
//   }
//   export function validateStampmoney(stampmoney) {
//     if (stampmoney <= 0) {
//       return false;
//     }
//     return true;
//   }
//   export function validateTVA(TVA) {
//     if (TVA <= 0) {
//       return false;
//     }
//     return true;
//   }
//   export function validateFinalP(FinalP) {
//     if (FinalP <= 0) {
//       return false;
//     }
//     return true;
//   }




//   export function validateSenderStreetAddress19(streetAddress19) {
//     if (!streetAddress19.trim()) {
//       return false;
//     }
//     return true;
//   }
//   // export function validateSenderCity(city) {
//   //   if (!city.trim()) {
//   //     return false;
//   //   }
//   //   return true;
//   // }
//   export function validateInvoicenumber19(validateInvoicenumber19) {
//     if (!invoicenumber19.trim()) {
//       return false;
//     }
//     return true;
//   }
  

//   export function validateSenderPostCode19(postCode19) {
//     return /^\d{5}(-\d{4})?$/.test(postCode19); // Basic post code validation
//   }
//   // export function validateSenderCountry(country) {
//   //   if (!country.trim()) {
//   //     return false;
//   //   }
//   //   return true;
//   // }
  
//   export function validateCLientName19(name19) {
//     return /^[a-zA-Z]+$/.test(name); // Only allow letters
//   }
//   export function validateCLientPhone19(phone19) {
//     if (!phone19.trim()) {
//       return false;
//     }
//     return true; // Basic email validation
//   }
  
//   export function validateClientStreetAddress19(streetAddress19) {
//     if (!streetAddress19.trim()) {
//       return false;
//     }
//     return true;
//   }
//   export function validateClientCity19(city19) {
//     if (!city19.trim()) {
//       return false;
//     }
//     return true;
//   }
//   export function validateStatus19(clientstatus19) {
//     if (!clientstatus19.trim()) {
//       return false;
//     }
//     return true; // Basic post code validation
//   }
//   export function validateClientCountry19(country19) {
//     if (!country19.trim()) {
//       return false;
//     }
//     return true;
//   }
  
//   export function validateItemName19(itemName19) {
//     if (!itemName19.trim()) {
//       return false;
//     }
//     return true;
//   }
//   export function validateItemPrice19(itemPrice19) {
//     if (itemPrice19 <= 0) {
//       return false;
//     }
//     return true;
//   }
//   // export function validateItemCount19(itemCount19) {
//   //   if (itemCount19 <= 0) {
//   //     return false;
//   //   }
//   //   return true;
//   // }
//   // export function validateItemCount1(itemCount1) {
//   //   if (itemCount1 <= 0) {
//   //     return false;
//   //   }
//   //   return true;
//   // }
//   export function validateStampmoney19(stampmoney19) {
//     if (stampmoney19 <= 0) {
//       return false;
//     }
//     return true;
//   }
//   export function validateTVA19(TVA19) {
//     if (TVA19 <= 0) {
//       return false;
//     }
//     return true;
//   }
//   export function validateFinalP19(FinalP19) {
//     if (FinalP19 <= 0) {
//       return false;
//     }
//     return true;
//   }






//For regular invoices
export function validateSenderStreetAddress(streetAddress) {
  return streetAddress.trim() !== '';
}

export function validateInvoicenumber(invoicenumber) {
  return invoicenumber.trim() !== '';
}

// export function validateSenderPostCode(postCode) {
//   return /^\d{5}(-\d{4})?$/.test(postCode);
// }

export function validateCLientName(CLientName) {
  return /^[a-zA-Z]+$/.test(CLientName);
}

export function validateCLientPhone(CLientPhone) {
  return CLientPhone.trim() !== '';
}

export function validateClientStreetAddress(streetAddress) {
  return streetAddress.trim() !== '';
}

export function validateClientCity(city) {
  return city.trim() !== '';
}

export function validateStatus(clientstatus) {
  return clientstatus.trim() !== '';
}

export function validateClientCountry(country) {
  return country.trim() !== '';
}

export function validateItemName(itemName) {
  return itemName.trim() !== '';
}

export function validateItemPrice(itemPrice) {
  return itemPrice > 0;
}

export function validateItemCount(itemCount) {
  return itemCount > 0;
}

export function validateItemCount1(itemCount1) {
  return itemCount1 > 0;
}

export function validateStampmoney(stampmoney) {
  return stampmoney > 0;
}

export function validateTVA(TVA) {
  return TVA > 0;
}

export function validateFinalP(FinalP) {
  return FinalP > 0;
}

// For invoices19
export function validateSenderStreetAddress19(streetAddress19) {
  return streetAddress19.trim() !== '';
}

export function validateInvoicenumber19(invoicenumber19) {
  return invoicenumber19.trim() !== '';
}

export function validateSenderPostCode19(postCode19) {
  return /^\d{5}(-\d{4})?$/.test(postCode19);
}

export function validateCLientName19(name19) {
  return /^[a-zA-Z]+$/.test(name19);
}

export function validateCLientPhone19(phone19) {
  return phone19.trim() !== '';
}

export function validateClientStreetAddress19(streetAddress19) {
  return streetAddress19.trim() !== '';
}

export function validateClientCity19(city19) {
  return city19.trim() !== '';
}

export function validateStatus19(clientstatus19) {
  return clientstatus19.trim() !== '';
}

export function validateClientCountry19(country19) {
  return country19.trim() !== '';
}

export function validateItemName19(itemName19) {
  return itemName19.trim() !== '';
}

export function validateItemPrice19(itemPrice19) {
  return itemPrice19 > 0;
}

export function validateStampmoney19(stampmoney19) {
  return stampmoney19 > 0;
}

export function validateTVA19(TVA19) {
  return TVA19 > 0;
}

export function validateFinalP19(FinalP19) {
  return FinalP19 > 0;
}