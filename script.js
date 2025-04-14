var crsr = document.querySelector("#cursor")
var crsrb = document.querySelector("#cursor-blur")
document.addEventListener("mousemove", function (dets) {
  crsr.style.left = dets.x + "px"
  crsr.style.top = dets.y + "px"
  crsrb.style.left = dets.x - 250 + "px"
  crsrb.style.top = dets.y - 250 + "px"
})


gsap.to("#nav", {
  backgroundColor: "#000",
  duration: 0.5,
  height: "100px",
  scrollTrigger: {
    trigger: "#nav",
    scroller: "body",
    // markers: true,
    start: "top -10%",
    end: "top -11%",
    scrub: 1,
  }
})
gsap.to("#main", {
  backgroundColor: "#000",
  scrollTrigger: {
    trigger: "#main",
    scroller: "body",
    start: "top -25%",
    end: "top -70%",
    scrub: 2,

  }
})

// function toggleMenu() {
//   var navLinks = document.getElementById("nav-links");
//   if (navLinks.style.display === "flex") {
//       navLinks.style.display = "none";
//   } else {
//       navLinks.style.display = "flex";
//   }
// }
function toggleMenu() {
  var nav = document.getElementById("nav");
  nav.classList.toggle("open");
}


// Function to handle adding active class
function setActiveLink() {
  // Remove 'active' class from all nav links
  const navLinks = document.querySelectorAll('#nav a');
  navLinks.forEach(link => {
    link.classList.remove('active');
  });

  // Add 'active' class to the clicked link
  this.classList.add('active');
}

// Attach click event listener to all navigation links
const navLinks = document.querySelectorAll('#nav a');
navLinks.forEach(link => {
  link.addEventListener('click', setActiveLink);
});

// Optional: On page load, set the active link based on the current URL
window.onload = function () {
  const currentPath = window.location.pathname;
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active'); // Mark the current page link as active
    }
  });
};




let carouselCurrentIndex = 0;
const carouselSlides = document.querySelectorAll(".carousel-slide");
const carouselContainer = document.querySelector(".carousel-slides");
const videoPlayers = [];

function isMobileView() {
  return window.innerWidth <= 480;
}

function updateBottomSectionVisibility() {
  if (isMobileView()) {
    bottomSections.style.display = "none";
  } else {
    bottomSections.style.display = "flex";
  }
}

function showCarouselSlide(index) {
  const carouselSlideWidth = carouselSlides[0].clientWidth;
  carouselContainer.style.transform = `translateX(-${carouselSlideWidth * index}px)`;
  updateBottomSectionVisibility();
}

function nextCarouselSlide() {
  carouselCurrentIndex = (carouselCurrentIndex + 1) % carouselSlides.length;
  showCarouselSlide(carouselCurrentIndex);
}

// This function is called when the YouTube player state changes
function onPlayerStateChange(event) {
  // Check if the video has finished playing (state = 0)
  if (event.data === YT.PlayerState.ENDED) {
    nextCarouselSlide();
  }
}

// Initialize the YouTube players for each iframe
function initYouTubePlayers() {
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach((iframe, index) => {
    const player = new YT.Player(iframe, {
      events: {
        'onStateChange': onPlayerStateChange
      }
    });
    videoPlayers.push(player);
  });
}

window.addEventListener("load", () => {
  showCarouselSlide(carouselCurrentIndex); // Ensure correct initial slide
  updateBottomSectionVisibility();
  initYouTubePlayers(); // Initialize YouTube players
});

window.addEventListener("resize", () => {
  showCarouselSlide(carouselCurrentIndex); // Adjust to window size changes
  updateBottomSectionVisibility();
});

setInterval(nextCarouselSlide, 5000);


// PROJECSSS

// document.getElementById("projects-link").addEventListener("click", function(event) {
//     event.preventDefault(); // Prevent default link behavior

//     const projectSec = document.querySelector(".projectsec");
//     const moreIcon = document.querySelector(".more-icon");

//     if (projectSec.style.display === "none" || projectSec.style.display === "") {
//         projectSec.style.display = "flex";
//         moreIcon.textContent = "🔼"; // Change icon to indicate "less"
//     } else {
//         projectSec.style.display = "none";
//         moreIcon.textContent = "🔽"; // Change icon to indicate "more"
//     }
// });






// document.getElementById('toggleButton').addEventListener('click', function () {
//   const newsSection = document.getElementById('newsSection');

//   // Check if the section is hidden or visible, then toggle the state
//   if (newsSection.style.display === 'none' || newsSection.style.display === 'block') {
//     newsSection.style.display = 'block';  // Show the section
//     this.textContent = 'HIDE NEWS';
//     this.style.fontSize = '18px'; // Change button text to "Show Less"
//     this.style.fontFamily = 'Montserrat';
//   } else {
//     newsSection.style.display = 'none';  // Hide the section
//     this.textContent = 'NEWS';  // Change button text back to "Show More"
//     this.style.fontSize = '18px'; // Change button text to "Show Less"
//     this.style.fontFamily = 'Montserrat';
//   }
// });


// document.getElementById('toggleButton').addEventListener('click', function () {
//   const newsSection = document.getElementById('newsSection');

//   // Toggle the "visible" class to show or hide the section
//   newsSection.classList.toggle('visible');

//   // Change the button text accordingly
//   if (newsSection.classList.contains('visible')) {
//     this.textContent = 'HIDE NEWS';  // Show "Hide News"
//   } else {
//     this.textContent = 'NEWS';  // Show "Show News"
//   }

//   this.style.fontSize = '18px';  // Set font size
//   this.style.fontFamily = 'Montserrat';  // Set font family
// });

// faqsssss
document.addEventListener("DOMContentLoaded", function () {
  const toggleButtons = document.querySelectorAll(".toggle-btn");
  const closeButtons = document.querySelectorAll(".close-btn");

  toggleButtons.forEach(button => {
    button.addEventListener("click", function () {
      const faqCard = this.closest(".faq-card");
      faqCard.classList.toggle("active");
    });
  });

  closeButtons.forEach(button => {
    button.addEventListener("click", function () {
      const faqCard = this.closest(".faq-card");
      faqCard.classList.remove("active");
    });
  });

  // Initialize the chat functionality
  initializeChat();
});

// Chat functionality
function initializeChat() {
  // Add initial welcome message
  setTimeout(() => {
    addBotMessage("👋 Welcome to IMAXX TV Support! How can I help you today?", [
      "What subscription plans do you offer?",
      "How can I watch content?",
      "Tell me about your shows"
    ]);
  }, 1000);

  // Set up event listeners
  document.getElementById('chat-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
}

// Toggle chat visibility
function toggleChat() {
  const chatContainer = document.getElementById('chat-container');

  if (chatContainer.style.display === 'none' || !chatContainer.style.display) {
    chatContainer.style.display = 'flex';
    document.getElementById('chat-input').focus();

    // Scroll to bottom of messages
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } else {
    chatContainer.style.display = 'none';
  }
}

// Chat context to remember conversation details
let chatContext = {
  userName: null,
  preferredGenre: null,
  hasAccount: null,
  lastQuestion: null,
  messageCount: 0
};

// Send a message from user input
function sendMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();

  if (message) {
    addUserMessage(message);
    processMessage(message);
    input.value = '';
  }
}

// Add a user message to the chat
function addUserMessage(message) {
  const chatMessages = document.getElementById('chat-messages');
  const messageElement = document.createElement('div');
  messageElement.classList.add('chat-message', 'user-message');

  // Format message with markdown-like syntax
  let formattedMessage = message
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');

  messageElement.innerHTML = formattedMessage;

  // Add timestamp
  const timeElement = document.createElement('div');
  timeElement.classList.add('chat-time');
  const now = new Date();
  timeElement.textContent = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
  messageElement.appendChild(timeElement);

  chatMessages.appendChild(messageElement);
  scrollToBottom();

  // Increment message count
  chatContext.messageCount++;
}

// Add a bot message to the chat
function addBotMessage(message, suggestions = []) {
  // Add typing indicator
  const typingIndicator = document.createElement('div');
  typingIndicator.classList.add('typing-indicator');
  typingIndicator.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;

  const chatMessages = document.getElementById('chat-messages');
  chatMessages.appendChild(typingIndicator);
  scrollToBottom();

  // Remove typing indicator and add actual message after delay
  setTimeout(() => {
    chatMessages.removeChild(typingIndicator);

    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', 'bot-message');

    // Format message with markdown-like syntax
    let formattedMessage = message
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');

    messageElement.innerHTML = formattedMessage;

    // Add timestamp
    const timeElement = document.createElement('div');
    timeElement.classList.add('chat-time');
    const now = new Date();
    timeElement.textContent = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    messageElement.appendChild(timeElement);

    // Add suggestions if provided
    if (suggestions && suggestions.length > 0) {
      const suggestionsContainer = document.createElement('div');
      suggestionsContainer.classList.add('chat-suggestions');

      suggestions.forEach(suggestion => {
        const suggestionElement = document.createElement('div');
        suggestionElement.classList.add('chat-suggestion');
        suggestionElement.textContent = suggestion;
        suggestionElement.addEventListener('click', () => {
          addUserMessage(suggestion);
          processMessage(suggestion);
        });
        suggestionsContainer.appendChild(suggestionElement);
      });

      messageElement.appendChild(suggestionsContainer);
    }

    chatMessages.appendChild(messageElement);
    scrollToBottom();
  }, 1500); // Simulate typing
}

// Process the user's message and determine response
function processMessage(message) {
  // Update context based on message
  updateContext(message);

  // Personalized greeting if we know the user's name
  if (chatContext.userName && chatContext.messageCount <= 2) {
    addBotMessage(`Hi ${chatContext.userName}! How can I help you today?`);
    return;
  }

  // Convert message to lowercase for easier matching
  const lowerMessage = message.toLowerCase();

  // Check for subscription related queries
  if (lowerMessage.includes('subscription') || lowerMessage.includes('plan') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    const subscriptionResponse = `
            **IMAXX TV Subscription Plans:**
            
            1. **Basic Plan** - ₹99/month
               • Access to all regular content
               • SD quality streaming
               • Watch on one device at a time
            
            2. **Standard Plan** - ₹199/month
               • Access to all regular content
               • HD quality streaming
               • Watch on two devices simultaneously
            
            3. **Premium Plan** - ₹299/month
               • Access to all content including exclusives
               • 4K Ultra HD quality where available
               • Watch on four devices simultaneously
               • Ad-free experience
            
            Would you like to sign up for a plan today?`;

    addBotMessage(subscriptionResponse, ["Sign up now", "Tell me more about content", "Payment methods"]);
    return;
  }

  // Check for payment related queries
  if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('card') || lowerMessage.includes('upi')) {
    const paymentResponse = `
            **IMAXX TV accepts the following payment methods:**
            
            • Credit & Debit Cards (Visa, Mastercard, RuPay)
            • UPI Payments
            • Net Banking
            • Mobile Wallets (Paytm, PhonePe, Amazon Pay)
            • IMAXX Gift Cards
            
            All transactions are secure and encrypted. Would you like to know anything else about payments?`;

    addBotMessage(paymentResponse, ["Subscription details", "Is it safe?", "Cancel anytime?"]);
    return;
  }

  // Check for content related queries
  if (lowerMessage.includes('movie') || lowerMessage.includes('show') || lowerMessage.includes('content') || lowerMessage.includes('watch')) {
    const contentResponse = `
            **IMAXX TV offers a diverse range of content including:**
            
            • Blockbuster Movies
            • Trending Shows & Series
            • Classic Films
            • Documentaries
            • Kids Content
            • Regional Cinema
            
            New content is added weekly. You can browse our full library in the Media Center section.
            
            What kind of content are you interested in?`;

    addBotMessage(contentResponse, ["Action movies", "Drama series", "Kids content", "Regional films"]);
    return;
  }

  // Check for device/watching related queries
  if (lowerMessage.includes('device') || lowerMessage.includes('tv') || lowerMessage.includes('phone') || lowerMessage.includes('tablet') || lowerMessage.includes('computer')) {
    const deviceResponse = `
            **IMAXX TV is available on various devices:**
            
            • Smart TVs (Samsung, LG, Sony, etc.)
            • Android & iOS Phones/Tablets
            • Web Browsers
            • Streaming Devices (Fire TV, Chromecast, etc.)
            • Gaming Consoles
            
            Just download our app from your device's app store or visit imaxxtv.com in your browser.`;

    addBotMessage(deviceResponse, ["Download the app", "Technical requirements", "How to cast to TV"]);
    return;
  }

  // Check for account/sign up related queries
  if (lowerMessage.includes('sign up') || lowerMessage.includes('account') || lowerMessage.includes('register') || lowerMessage.includes('login')) {
    const accountResponse = `
            **Creating an IMAXX TV account is easy:**
            
            1. Click the "Sign Up" button or visit register.html
            2. Enter your email address and create a password
            3. Choose your subscription plan
            4. Add your payment information
            5. Start watching!
            
            Your first 7 days are completely free, and you can cancel anytime.`;

    addBotMessage(accountResponse, ["Go to sign up", "Subscription plans", "Forgot password"]);
    return;
  }

  // Technical issues response
  if (lowerMessage.includes('problem') || lowerMessage.includes('issue') || lowerMessage.includes('error') || lowerMessage.includes('not working') || lowerMessage.includes('trouble')) {
    const techResponse = `
            **I'm sorry you're experiencing technical issues. Here are some quick fixes:**
            
            • Check your internet connection
            • Update your app to the latest version
            • Clear cache and cookies if using a browser
            • Restart your device
            
            If problems persist, our technical team is available 24/7 at support@imaxxtv.com or call us at 022-45174085.`;

    addBotMessage(techResponse, ["Still having issues", "Contact support", "Other questions"]);
    return;
  }

  // Help/contact us response
  if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('contact') || lowerMessage.includes('chat') || lowerMessage.includes('human')) {
    const contactResponse = `
            **IMAXX TV Customer Support:**
            
            • Email: support@imaxxtv.com
            • Phone: 022-45174085 (9 AM - 9 PM)
            • Office (India): 202 Aditya Heritage, MindSpace, Malad West, Mumbai
            • Office (UK): 75 Shelton Street, Covent Gardens, London
            
            You can also visit our Contact Us page for more options.`;

    addBotMessage(contactResponse, ["Visit Contact Us page", "Email support", "Other questions"]);
    return;
  }

  // Catch greetings
  if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey') || lowerMessage.match(/^(hi|hello|hey)$/)) {
    addBotMessage("Hello there! How can I assist you with IMAXX TV today?", [
      "Subscription plans",
      "Available content",
      "Technical support"
    ]);
    return;
  }

  // Thank you response
  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks') || lowerMessage.includes('thx')) {
    addBotMessage("You're welcome! Is there anything else I can help you with today?", [
      "Yes, another question",
      "No, that's all"
    ]);
    return;
  }

  // Fallback response for anything else
  addBotMessage("I'm not sure I understand. Could you please rephrase or select one of these common topics?", [
    "Subscription plans",
    "Watch on devices",
    "Content library",
    "Technical help"
  ]);
}

// Update the chat context based on message content
function updateContext(message) {
  const lowerMessage = message.toLowerCase();

  // Try to identify user name
  if (!chatContext.userName) {
    const nameMatch = lowerMessage.match(/my name is ([a-z]+)/i) ||
      lowerMessage.match(/i am ([a-z]+)/i) ||
      lowerMessage.match(/i'm ([a-z]+)/i);

    if (nameMatch && nameMatch[1]) {
      chatContext.userName = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1);
    }
  }

  // Try to identify genre preferences
  if (lowerMessage.includes('action') || lowerMessage.includes('thriller')) {
    chatContext.preferredGenre = 'action/thriller';
  } else if (lowerMessage.includes('comedy') || lowerMessage.includes('funny')) {
    chatContext.preferredGenre = 'comedy';
  } else if (lowerMessage.includes('drama') || lowerMessage.includes('emotional')) {
    chatContext.preferredGenre = 'drama';
  }

  // Try to identify if user has an account
  if (lowerMessage.includes('my account') || lowerMessage.includes('logged in') || lowerMessage.includes('signed in')) {
    chatContext.hasAccount = true;
  } else if (lowerMessage.includes('sign up') || lowerMessage.includes('create account')) {
    chatContext.hasAccount = false;
  }

  // Remember last question
  chatContext.lastQuestion = message;
}

// Scroll chat messages to bottom
function scrollToBottom() {
  const chatMessages = document.getElementById('chat-messages');
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Initialize chat on page load
document.addEventListener('DOMContentLoaded', function () {
  initializeChat();
});

// Meeting Scheduler Function
function scheduleMeeting() {
  // You can replace this with your preferred meeting scheduling service
  window.open('https://calendly.com/your-calendly-link', '_blank');
}