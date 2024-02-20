import { useState, useCallback, useEffect, useRef} from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  //useref hook

  const passwordref = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()_+~`{}[]';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const cpopypasswordtoclipboard = useCallback(()=>{
    passwordref.current?.select();
    // passwordref.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(password)
  }, [password])


  //useEffect 
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-500'>
          <h1 className='text-white text-center'>Password Generator</h1>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordref}
          />
          <button onClick={cpopypasswordtoclipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={charAllowed}
              id='CharacterInput'
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor='CharacterInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

/* ...Certainly! This React code is a Password Generator application that uses React hooks like useState,
 useCallback, useEffect, and useRef. Below is an explanation of the code:

State Variables:
length, numberAllowed, charAllowed, password: These are state variables managed by
 the useState hook. They respectively represent the length of the password,
 whether numbers are allowed in the password, whether special characters are allowed, and the generated password.
Ref Variable:
passwordref: This is a ref created using the useRef hook that references the password input element.
Functions:
passwordGenerator: This function generates a random password based on the specified length, 
including lowercase letters, uppercase letters, numbers,
 and special characters if allowed. It updates the password state variable.

cpopypasswordtoclipboard: This function copies the generated password to the clipboard. 
It uses passwordref to select the input field's text and then
 utilizes the navigator.clipboard.writeText() method to copy the text to the clipboard.

useEffect:
The useEffect hook is used to call the passwordGenerator function whenever there are changes in length, 
numberAllowed, charAllowed, or passwordGenerator.
JSX:
The JSX part renders a user interface with:

A title "Password Generator".
An input field displaying the generated password.
A button to copy the generated password to the clipboard.
Range input for password length adjustment.
Checkboxes to allow numbers and special characters in the generated password.
Event Handlers:

Input change handlers (onChange) are attached to the range input and checkboxes to update the respective 
state variables (length, numberAllowed, 
  charAllowed) when users change the input values.

The button onClick event triggers the cpopypasswordtoclipboard function to copy the generated password to the clipboard.

This application dynamically generates passwords based on user-defined criteria and allows copying the generated 
password to the clipboard for easy use. */
