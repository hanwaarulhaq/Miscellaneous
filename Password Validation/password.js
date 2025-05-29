// Define some variables for the criteria
const minLength = 10; // Minimum length of password
const minLower = 1; // Minimum number of lowercase letters
const minUpper = 1; // Minimum number of uppercase letters
const minDigit = 1; // Minimum number of digits
const minSpecial = 1; // Minimum number of special characters
const maxRepeatedLength = 3; // Maximum number of repeated characters
const maxSequentialLength = 3; // Maximum number of Sequential characters

const specialChars = "!@#$%^&*()_+-=[]{}|;:,./<>?"; // A string of special characters
const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+={}[]:;'<>?,./";
const prohibitedPasswords = ["password", "123456","12345678", "abcd", "abc123", "@#$%^&", "qwerty", "asdfgh", "zxcvbn", "1234567890", "zzzzzz", "dictionary", 
  "default", "username", "host", "0123", "9876", "111111",  "iloveyou",  "letmein",  "monkey",  "trustno1"];// A list of prohibited passwords
const sequences = ["`1234567890-=", "~!@#$%^&*()_+", "qwertyuiop[]\\", "QWERTYUIOP{}|", "asdfghjkl;'",'ASDFGHJKL:"', "zxcvbnm,./", "ZXCVBNM<>?" ]; // A list of sequences on a standard keyboard
const personalInfo = [ "name", "phone", "birth", "address", "alma", "mater" ]; // A list of personal information keywords
const dictionary = [ "apple", "banana",  "orange",  "grape",  "melon",  "water",  "fire",  "earth",  "air",  "wind",]; // A list of dictionary words
const defaultPasswords = ["P@ssw0rd", "W3lc0m3", "Ch@ng3m3", "L0v3y0u", "S3cur3m3", "H3ll0w0rld", "G00dbY3", "N0t4y0u", "Y3s4m3", "N0p3n0p3"]; // A list of default or suggested passwords
const usernameOrHost = [ "admin", "user", "guest", "root", "localhost", "server", "domain", "network", "computer", "system"]; // A list of username or host name keywords

var PasswordChecks = {
  lengthCount:false,
  lowerCount:false,
  upperCount:false,
  digitCount:false,
  specialCount:false,
  isCommon:false,
  isPersonal:false,
  isSequential:false,
  isRepeated:false,
  isDictionary:false,
  isDefault:false,
  isUsernameOrHost:false,
  isSingleDigit:false,
  isIncremental:false
}



// A function to check password security
function checkPasswordSecurity(password) {  

  // Initialize some variables for counting
  var lowerCount = 0;
  var upperCount = 0;
  var digitCount = 0;
  var specialCount = 0;

  // Loop through each character of the password
  for (var i = 0; i < password.length; i++) {
    var char = password[i]; // Get the current character
    if (char >= "a" && char <= "z") {
      lowerCount++; // Increment the lowercase count
    } else if (char >= "A" && char <= "Z") {
      upperCount++; // Increment the uppercase count
    } else if (char >= "0" && char <= "9") {
      digitCount++; // Increment the digit count
    } else if (specialChars.indexOf(char) != -1) {
      specialCount++; // Increment the special character count
    }
  }
  
  PasswordChecks.lengthCount = password.length >= minLength;
  PasswordChecks.lowerCount = lowerCount >= minLower;
  PasswordChecks.upperCount = upperCount >= minUpper;
  PasswordChecks.digitCount = digitCount >= minDigit;
  PasswordChecks.specialCount = specialCount >= minSpecial;
  PasswordChecks.isCommon = !isCommon(password);
  PasswordChecks.isPersonal = !isPersonal(password);
  PasswordChecks.isSequential = !isSequential(password);
  PasswordChecks.isRepeated = !isRepeated(password);
  PasswordChecks.isDictionary = !isDictionary(password);
  PasswordChecks.isDefault = !isDefault(password);
  PasswordChecks.isUsernameOrHost = !isUsernameOrHost(password);
  PasswordChecks.isSingleDigit= !isSingleDigit(password);
  PasswordChecks.isIncremental= !isIncremental(password);
  // Check if the password meets all the criteria
  return (PasswordChecks.lengthCount &&
    PasswordChecks.lowerCount &&
    PasswordChecks.upperCount &&
    PasswordChecks.digitCount &&
    PasswordChecks.specialCount &&
    PasswordChecks.isCommon &&
    PasswordChecks.isPersonal &&
    PasswordChecks.isSequential &&
    PasswordChecks.isRepeated &&
    PasswordChecks.isDictionary &&
    PasswordChecks.isDefault &&
    PasswordChecks.isUsernameOrHost &&
    PasswordChecks.isSingleDigit &&
    PasswordChecks.isIncremental )  
}

// A function to check if the password is common, such as "password" or "1234"
function isCommon(password) {
  return prohibitedPasswords.includes(password.toLowerCase()); // Return true if the password is in the list, false otherwise
}

// A function to check if the password contains personal information, such as name, phone number, or birth date
function isPersonal(password) {  
  for (var i = 0; i < personalInfo.length; i++) {
    var keyword = personalInfo[i]; // Get the current keyword
    if (password.toLowerCase().includes(keyword)) {
      return true; // Return true if the password contains the keyword, false otherwise
    }
  }

  return false; // Return false if none of the keywords are found in the password
}

// A function to check if the password contains sequential characters, such as "@#$%^&" or "abcd"
function isSequential(password) {
  for (var i = 0; i < sequences.length; i++) {
    var sequence = sequences[i]; // Get the current sequence
    for (var j = 0; j < sequence.length - maxSequentialLength + 1; j++) {
      var subsequence = sequence.substring(j, j + maxSequentialLength); // Get a subsequence of the minimum length
      if (password.includes(subsequence)) {
        return true; // Return true if the password contains the subsequence, false otherwise
      }
    }
  }

  return false; // Return false if none of the subsequences are found in the password
}

// A function to check if the password contains repeated characters, such as "zzzzzz" or "111111"
function isRepeated(password) {
  var prevChar = ""; // Initialize a variable for the previous character
  var repeatCount = 0; // Initialize a variable for the repeat count

  for (var i = 0; i < password.length; i++) {
    var char = password[i]; // Get the current character
    if (char == prevChar) {
      repeatCount++; // Increment the repeat count if the character is the same as the previous one
    } else {
      repeatCount = 0; // Reset the repeat count if the character is different from the previous one
    }
    prevChar = char; // Update the previous character

    if (repeatCount >= maxRepeatedLength - 1) {
      return true; // Return true if the repeat count reaches the minimum length minus one, false otherwise
    }
  }

  return false; // Return false if none of the characters are repeated enough times
}

// A function to check if the password is a dictionary word, such as "apple" or "banana"
function isDictionary(password) {
  return dictionary.includes(password.toLowerCase()); // Return true if the password is in the list, false otherwise
}

// A function to check if the password is a default or suggested password, such as "P@ssw0rd" or "W3lc0m3"
function isDefault(password) {
  return defaultPasswords.includes(password); // Return true if the password is in the list, false otherwise
}

// A function to check if the password is a username or host name, such as "admin" or "localhost"
function isUsernameOrHost(password) {
  return usernameOrHost.includes(password.toLowerCase()); // Return true if the password is in the list, false otherwise
}

// A function to check if the password is followed or preceded by a single digit, such as "password1" or "2password"
function isSingleDigit(password) {
  var firstChar = password[0]; // Get the first character of the password
  var lastChar = password[password.length - 1]; // Get the last character of the password

  return (
    (firstChar >= "0" && firstChar <= "9") ||
    (lastChar >= "0" && lastChar <= "9")
  ); // Return true if either of them is a digit, false otherwise
}

// A function to check if the password forms a pattern by incrementing a number or character at the beginning or end, such as "password2" or "bpassword"
function isIncremental(password) {
  var firstChar = password[0]; // Get the first character of the password
  var lastChar = password[password.length - 1]; // Get the last character of the password

  return (
    (firstChar >= "a" && firstChar <= "z" && lastChar == String.fromCharCode(firstChar.charCodeAt(0) + 1)) ||
    (firstChar >= "A" && firstChar <= "Z" && lastChar == String.fromCharCode(firstChar.charCodeAt(0) + 1)) ||
    (firstChar >= "0" && firstChar <= "8" && lastChar == String.fromCharCode(firstChar.charCodeAt(0) + 1)) ||
    (lastChar >= "a" && lastChar <= "z" && firstChar == String.fromCharCode(lastChar.charCodeAt(0) - 1)) ||
    (lastChar >= "A" && lastChar <= "Z" && firstChar == String.fromCharCode(lastChar.charCodeAt(0) - 1)) ||
    (lastChar >= "0" && lastChar <= "8" && firstChar == String.fromCharCode(lastChar.charCodeAt(0) - 1))
  ); // Return true if either of the characters is incremented or decremented by one, false otherwise
}

function generateStrongPassword(length) { 
  // Generate a random password of the specified length.
  const password = [];
  for (let i = 0; i < length; i++) {
    const character = characters[Math.floor(Math.random() * characters.length)];
    while (prohibitedPasswords.includes(character + password.join("")) || prohibitedPasswords.includes(password.join("") + character)) {
      character = characters[Math.floor(Math.random() * characters.length)];
    }
    password.push(character);
  }

  // Return the random password.
  return password.join("");
}

function getSecureStrongPassword(){
  var isValid = false;
  while(isValid == false){
    var pass = generateStrongPassword(minLength);
    if(checkPasswordSecurity(pass)){
      isValid = true;
      return pass;
    }
  }
}