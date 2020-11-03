/**
 * Verkefni 8 – Caesar dulmál með vefviðmóti
 *
 * Verður að passa _nákvæmlega_ við gefið HTML, mun annars brotna.
 * Þ.e.a.s., ekki þarf að skrifa meðhöndlun á HTML elementum sem vantar
 */

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n, alphabet = '') {
  let mystring = '';
  str = str.toLocaleUpperCase();
  for (let i = 0; i < str.length; i++) {
    if(alphabet.indexOf(str.charAt(i)) > -1) {
      mystring += _helper(str.charAt(i), n, true, alphabet);
    }
  }
  return mystring;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n, alphabet = '') {
  let mystring = '';
  str = str.toLocaleUpperCase();
  for (let i = 0; i < str.length; i++) {
    if(alphabet.indexOf(str.charAt(i)) > -1) {
      mystring += _helper(str.charAt(i), n, false, alphabet);
    }
  }
  return mystring;
}

/**
 * Hjalparfall sem gerir encode/decode á einn staf
 *
 * @param {char} letter Stafurinn sem á að breyta
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {bool} enc Hvort að það á aðhliðra til hægri (true) eða vinstri (false)
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi stafurinn hliðraður um n
 */
function _helper(letter, n, enc, alphabet) {
  if (enc) {
    return alphabet.charAt((alphabet.indexOf(letter) + n) % alphabet.length);
  }
  else {
    return alphabet.charAt((alphabet.indexOf(letter) - n + alphabet.length) % alphabet.length);
  }
}

const Caesar = (() => {
  // let's fyrir html hluti
  let html_alphabet;
  let html_radio_encode;
  let html_radio_decode;
  let html_shift;
  let html_shift_label;
  let html_input;
  let html_result;
  // Default stafróf, uppfært þegar slegið inn í "alphabet"
  let alphabet = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ';

  // Default type, uppfært af radio input
  let type = 'encode';

  // Default hliðrun, uppfært af "shift"
  let shift = 3;

  // functions
  function updateShift() {
    html_shift_label.innerHTML = html_shift.value;
    shift = html_shift.value;
    updateResult();
  }

  function updateAlphabet() {
    let len = html_alphabet.value.length;
    if(shift > len) {
      shift = len;
      html_shift.value = len;
    }
    html_shift.max = len;
    alphabet = html_alphabet.value.toLocaleUpperCase();
    updateShift();
  }

  function updateResult() {
    if (type == 'encode') {
      html_result.innerHTML = encode(html_input.value, shift, alphabet);
    }
    else {
      html_result.innerHTML = decode(html_input.value, shift, alphabet);
    }
  }

  function init(el) {
    // Setja event handlera á viðeigandi element
    html_alphabet = document.querySelector('input[id="alphabet"]');
    html_alphabet.addEventListener('input', updateAlphabet);

    html_radio_encode = document.querySelector('div.radio input[value="encode"]');
    html_radio_encode.addEventListener('click', function() {
      type = 'encode';
      updateResult();
    });

    html_radio_decode = document.querySelector('div.radio input[value="decode"]');
    html_radio_decode.addEventListener('click', function() {
      type = 'decode'; 
      updateResult(); 
    });

    html_shift = document.querySelector('input[id="shift"]');
    html_shift.onchange = updateShift;

    html_shift_label = document.querySelector('.shiftValue');

    html_input = document.querySelector('input[id="input"]');
    html_input.addEventListener('input', updateResult);

    html_result = document.querySelector('.result');
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const ceasarForm = document.querySelector('.ceasar');

  Caesar.init(ceasarForm);
});
