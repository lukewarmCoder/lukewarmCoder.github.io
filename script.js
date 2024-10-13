const terminalBody = document.getElementById('terminal-body');
const userInput = document.getElementById('userInput');
const inputContainer = document.getElementById('inputContainer');
const initialTexts = [
  "Hey! Welcome to my site.",
  "You can navigate the site from this terminal, or you can use the links, I guess.",
  "Type 'help' for a list of available commands."
];
let textIndex = 0;
let charIndex = 0;
let lineIndex = 0;

function typeText() {
  if ( textIndex < initialTexts.length ) {
    if ( charIndex < initialTexts[textIndex].length ) {
      terminalBody.innerHTML += initialTexts[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeText, 25); // Adjust typing speed (milliseconds)
    } else {
      terminalBody.innerHTML += "<br>"; // Move to the next line
      textIndex++;
      charIndex = 0;
      setTimeout(typeText, 500); // Pause between lines (milliseconds)
    }
  } else {
    inputContainer.style.display = 'block'; // Show input after text typing
  }
}

// Start typing effect when the page loads
document.addEventListener('DOMContentLoaded', () => {
  if ( !sessionStorage.getItem('visited') ) {
    // If we get here, we are visiting for the first time! Queue the text animation.
    typeText();
    // Set the flag in localStorage to indicate the user has visited
    sessionStorage.setItem('visited', 'true');
  } else {
    terminalBody.innerHTML = initialTexts[0] + "<br>" + initialTexts[1]
    + "<br>" + initialTexts[2];
  }
  
});

// This is triggered when the user hits enter on the command line
userInput.addEventListener('keydown', function(e) {
  if ( e.key === 'Enter' ) {
    const command = userInput.value;
    terminalBody.innerHTML += `<p>> ${command}</p>`;
    executeCommand(command);
    userInput.value = '';
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }
});

function executeCommand(command) {
  let output = '';

  if ( command.toLowerCase() === 'help' ) {
    output = 'List of available commands: <br>- resume<br>- echo [text]<br>- help';
  } else if ( command.toLowerCase().startsWith('echo ') ) {
    const text = command.slice(5);
    output = text;
  } else if ( command.toLowerCase() === 'resume' ) {
    window.location.href = 'resume.html';
  } else {
    output = 'Command not found. Type \'help\' for available commands.';
  }

  terminalBody.innerHTML += `<p>${output}</p>`;
}
