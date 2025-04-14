function openDetailPage(title, description, imgSrc) {
    const popup = document.getElementById('media-popup');
    const popupImg = document.getElementById('popup-img');
    const popupTitle = document.getElementById('popup-title');
    const popupDescription = document.getElementById('popup-description');
    const watchNowBtn = document.getElementById('watch-now-btn');
    const addToListBtn = document.getElementById('add-to-list-btn');

    // Set content
    popupImg.src = imgSrc;
    popupTitle.textContent = title;
    popupDescription.textContent = description;

    // Show popup
    popup.style.display = 'flex';

    // Add event listeners for buttons
    watchNowBtn.onclick = () => {
        // Handle watch now action
        console.log('Watch Now clicked for:', title);
    };

    addToListBtn.onclick = () => {
        // Handle add to list action
        console.log('Add to List clicked for:', title);
    };
}

function showPopup(title, description, imgSrc) {
    document.getElementById('popup-title').innerText = title;
    document.getElementById('popup-description').innerText = description;
    document.getElementById('popup-img').src = imgSrc;

    const popup = document.getElementById('media-popup');
    popup.style.display = 'flex';

    // Do NOT hide parent back button - keep it visible behind the popup back button
    // Both back buttons will be in the same position
    // No need to modify the main back button visibility 

    // Handle history - add a state so back button closes popup first
    const currentUrl = window.location.href;
    window.history.pushState({ popupOpen: true }, '', currentUrl);

    // Add event listener for browser back button
    window.addEventListener('popstate', handlePopState);
}

function closePopup() {
    const popup = document.getElementById('media-popup');
    popup.style.display = 'none';

    // Remove popstate event listener
    window.removeEventListener('popstate', handlePopState);
}

// Handle browser back button when popup is open
function handlePopState(event) {
    const popup = document.getElementById('media-popup');
    if (popup && popup.style.display === 'flex') {
        closePopup();

        // Prevent default back behavior
        event.preventDefault();

        // Push state again so we don't leave the page
        const currentUrl = window.location.href;
        window.history.pushState(null, '', currentUrl);
    }
}

// Function to show section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.show-section').forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }

    // Update tab button styles
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
        if (button.textContent.toLowerCase().replace(/\s+/g, '-') === sectionId) {
            button.classList.add('active');
        }
    });
}

// Back button function
function goBacks() {
    window.history.back();
}

// Show trending section by default on page load
document.addEventListener('DOMContentLoaded', function () {
    showSection('trendins');

    // Add event listener for watch now button
    document.getElementById('watch-now-btn').addEventListener('click', function () {
        const title = document.getElementById('popup-title').innerText;
        alert('Starting playback: ' + title);
        closePopup();
    });

    // Ensure back button is always visible
    const backButton = document.getElementById('mbcbtns');
    if (backButton) {
        backButton.style.display = 'block';
        backButton.style.visibility = 'visible';
        backButton.style.zIndex = '9999';

        // Force icon visibility
        const icon = backButton.querySelector('.fa-arrow-left');
        if (icon) {
            icon.style.display = 'inline-block';
            icon.style.visibility = 'visible';
        }
    }

    // Add universal back button injection to ensure footer pages have back buttons
    const universalBackButtonScript = document.createElement('script');
    universalBackButtonScript.textContent = `
        // Auto-inject back button if needed
        window.addEventListener('load', function() {
            if (!document.getElementById('mbcbtns')) {
                const backButton = document.createElement('div');
                backButton.id = 'mbcbtns';
                backButton.setAttribute('style', 'z-index: 9999 !important; display: block !important; position: fixed !important; bottom: 20px !important; left: 20px !important; visibility: visible !important;');
                backButton.innerHTML = '<button class="btn-back" style="display: flex !important; justify-content: center !important; align-items: center !important; background-color: rgba(0, 0, 0, 0.7) !important; border: 2px solid #D1B261 !important; color: #D1B261 !important; border-radius: 50% !important; width: 50px !important; height: 50px !important; visibility: visible !important;" onclick="window.history.back()"><i class="fas fa-arrow-left" style="display: inline-block !important; color: #D1B261 !important; font-size: 20px !important; visibility: visible !important;"></i></button>';
                document.body.appendChild(backButton);
            }
        });
    `;
    document.head.appendChild(universalBackButtonScript);
});

// Function to filter shows based on search input
function filterShows() {
    const searchInput = document.getElementById('search-bar').value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();

        if (title.includes(searchInput) || description.includes(searchInput)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Chat Support Functions
function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer.style.display === 'none') {
        chatContainer.style.display = 'block';
        // Add initial bot message if the chat is empty
        if (document.getElementById('chat-messages').children.length === 0) {
            addBotMessage("Welcome to IMAXX TV! How can I assist you today? You can ask about our films, shows, plans, or technical support.");
        }
    } else {
        chatContainer.style.display = 'none';
    }
}

function sendMessage() {
    const inputField = document.getElementById('chat-input');
    const message = inputField.value.trim();

    if (message === '') return;

    // Add user message to chat
    addUserMessage(message);

    // Clear input field
    inputField.value = '';

    // Process the message and generate a response
    processMessage(message);
}

function addUserMessage(message) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'user-message';
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);

    // Scroll to bottom of chat
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addBotMessage(message) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'bot-message';
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);

    // Scroll to bottom of chat
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function processMessage(message) {
    // Simulate typing indicator
    const messagesContainer = document.getElementById('chat-messages');
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator bot-message';
    typingIndicator.innerHTML = `<span></span><span></span><span></span>`;
    messagesContainer.appendChild(typingIndicator);

    // Ensure typing indicator is visible
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Simple response logic based on keywords
    setTimeout(() => {
        // Remove typing indicator
        messagesContainer.removeChild(typingIndicator);

        const lowerMessage = message.toLowerCase();

        // Greeting responses
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            addBotMessage("Hello! Welcome to IMAXX TV. How can I help you today?");
        }
        // Subscription and pricing information
        else if (lowerMessage.includes('subscription') || lowerMessage.includes('pricing') || lowerMessage.includes('plan') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
            addBotMessage("IMAXX TV offers three subscription plans:\n\n1. Basic (₹199/month): SD streaming on 1 device\n2. Premium (₹499/month): HD streaming on 2 devices, downloads\n3. Premium+ (₹799/month): 4K streaming on 4 devices, downloads, exclusive content\n\nWould you like to know more about any specific plan?");
        }
        // Payment related queries
        else if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
            addBotMessage("We accept various payment methods including credit/debit cards, UPI, net banking, and mobile wallets. All transactions are secure and encrypted. For billing assistance, please email billing@imaxxtv.com");
        }
        // Cancellation and refund policies
        else if (lowerMessage.includes('cancel') || lowerMessage.includes('refund')) {
            addBotMessage("You can cancel your subscription anytime from your account settings. Refunds are processed within 5-7 business days. For immediate assistance with cancellations or refunds, please email support@imaxxtv.com");
        }
        // Content related questions
        else if (lowerMessage.includes('content') || lowerMessage.includes('show') || lowerMessage.includes('film') || lowerMessage.includes('series') || lowerMessage.includes('movie')) {
            if (lowerMessage.includes('trending') || lowerMessage.includes('popular')) {
                addBotMessage("Our trending content right now includes 'AKHRI KHAT', 'DAIRAA', and 'PRANKSTER'. You can find them in the Trending section on our homepage.");
            } else if (lowerMessage.includes('coming') || lowerMessage.includes('soon') || lowerMessage.includes('upcoming') || lowerMessage.includes('new')) {
                addBotMessage("Exciting new releases coming soon include 'THE VISIT', 'YAKSHNI', 'ASURAA', 'V3', and 'RANJISH'. Stay tuned for their release dates!");
            } else {
                addBotMessage("IMAXX TV offers a diverse library of content including original films, series, and shows across various genres. Our exclusive originals include 'DAIRAA', 'TERI MERI LOVE STORY', and 'CRIME MAXX'. Browse our collections on the home page or use the search bar to find specific titles.");
            }
        }
        // Account and registration
        else if (lowerMessage.includes('register') || lowerMessage.includes('sign up') || lowerMessage.includes('account') || lowerMessage.includes('login') || lowerMessage.includes('sign in')) {
            addBotMessage("To create an account, click on the Register button on the homepage. You'll need to provide:\n\n1. A valid email address\n2. Create a secure password\n3. Basic profile information\n\nExisting users can sign in using their email and password. Forgot your password? Use the 'Forgot Password' option on the login page.");
        }
        // Technical issues
        else if (lowerMessage.includes('problem') || lowerMessage.includes('issue') || lowerMessage.includes('error') || lowerMessage.includes('not working') || lowerMessage.includes('buffering') || lowerMessage.includes('slow')) {
            addBotMessage("I'm sorry you're experiencing technical difficulties. Here are some quick fixes:\n\n1. Check your internet connection\n2. Update your browser/app\n3. Clear cache and cookies\n4. Restart your device\n\nStill having issues? Please email tech@imaxxtv.com with details of your problem and device information.");
        }
        // Gratitude
        else if (lowerMessage.includes('thank')) {
            addBotMessage("You're welcome! I'm happy to help. If you have any other questions about IMAXX TV, feel free to ask. Enjoy your streaming experience!");
        }
        // Streaming options
        else if (lowerMessage.includes('watch') || lowerMessage.includes('stream') || lowerMessage.includes('video')) {
            addBotMessage("You can stream IMAXX TV content on any device with an internet connection. Just log in to your account through our website or mobile app and start watching! Our adaptive streaming adjusts quality based on your connection speed for uninterrupted viewing.");
        }
        // Download features
        else if (lowerMessage.includes('download') || lowerMessage.includes('offline')) {
            addBotMessage("Premium and Premium+ subscribers can download content for offline viewing. Look for the download icon next to eligible titles. Downloaded content is available for 30 days and remains accessible for 48 hours once you start watching.");
        }
        // Video quality
        else if (lowerMessage.includes('quality') || lowerMessage.includes('resolution') || lowerMessage.includes('hd') || lowerMessage.includes('4k')) {
            addBotMessage("IMAXX TV offers multiple streaming qualities:\n\n• SD (480p): Available on all plans\n• HD (720p): Available on Premium and Premium+\n• Full HD (1080p): Available on Premium and Premium+\n• 4K Ultra HD (2160p): Exclusive to Premium+\n\nStreaming quality automatically adjusts based on your internet connection and device capabilities.");
        }
        // Device compatibility
        else if (lowerMessage.includes('device') || lowerMessage.includes('phone') || lowerMessage.includes('tv') || lowerMessage.includes('tablet') || lowerMessage.includes('laptop') || lowerMessage.includes('computer')) {
            addBotMessage("IMAXX TV is available on:\n\n• Smartphones (iOS and Android)\n• Tablets\n• Smart TVs (Samsung, LG, Sony, etc.)\n• Web browsers (Chrome, Safari, Firefox)\n• Streaming devices (Chromecast, Fire TV, Apple TV)\n\nYou can also cast to compatible devices using Chromecast or AirPlay.");
        }
        // Specific content searches
        else if (lowerMessage.includes('mahabha') || lowerMessage.includes('mahabharat')) {
            addBotMessage("'MAHABHARAT' is available in our Shows section. It's an epic retelling of the ancient Indian mythology with stunning visuals and performances. You can start watching it now!");
        }
        else if (lowerMessage.includes('dairaa')) {
            addBotMessage("'DAIRAA' is one of our most popular series. You can find it in both our Trending and Series sections. It features an intriguing storyline that our viewers highly recommend.");
        }
        else if (lowerMessage.includes('crime')) {
            addBotMessage("'CRIME MAXX' is a thrilling investigation series available in our Shows section. Each episode features a different case that will keep you on the edge of your seat!");
        }
        // Platform info
        else if (lowerMessage.includes('about') || lowerMessage.includes('imaxx') || lowerMessage.includes('company') || lowerMessage.includes('platform')) {
            addBotMessage("IMAXX TV is a premier streaming platform offering exclusive content across films, series, and shows. Founded with a vision to bring quality entertainment to viewers, we focus on original productions and curated content. Our mission is to deliver compelling stories that resonate with diverse audiences.");
        }
        // Contact information
        else if (lowerMessage.includes('contact') || lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('email') || lowerMessage.includes('call') || lowerMessage.includes('phone')) {
            addBotMessage("You can reach IMAXX TV support through:\n\n• Email: support@imaxxtv.com\n• Technical Support: tech@imaxxtv.com\n• Billing: billing@imaxxtv.com\n• Phone: +91-XXXXXXXXXX (10 AM to 7 PM IST)\n\nWe typically respond to emails within 24 hours.");
        }
        // Fallback for unrecognized queries
        else {
            addBotMessage("I'm not sure I understand your question. As your IMAXX TV assistant, I can help with:\n\n• Content information\n• Subscription plans\n• Technical support\n• Account issues\n• Device compatibility\n\nPlease try rephrasing your question, or contact our support team at support@imaxxtv.com for personalized assistance.");
        }
    }, 1000);
}

// Add styles for chat widget
function addChatStyles() {
    const style = document.createElement('style');
    style.textContent = `
        #chat-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            font-family: 'Montserrat', sans-serif;
        }
        
        #chat-button {
            background: linear-gradient(135deg, #D1B261, #A28A01);
            color: white;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(209, 178, 97, 0.5);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        #chat-button:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(209, 178, 97, 0.7);
        }
        
        #chat-button::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, rgba(255,255,255,0.2), transparent);
            top: 0;
            left: 0;
        }
        
        #chat-button span {
            font-weight: bold;
            font-size: 14px;
            letter-spacing: 0.5px;
            position: relative;
            z-index: 2;
        }
        
        #chat-container {
            position: absolute;
            bottom: 75px;
            right: 0;
            width: 320px;
            height: 450px;
            background-color: #000000;
            border-radius: 12px;
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.5);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            border: 2px solid #D1B261;
            transition: all 0.3s ease;
            transform-origin: bottom right;
            animation: chatOpen 0.3s forwards;
        }
        
        @keyframes chatOpen {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
        #chat-header {
            background: linear-gradient(135deg, #D1B261, #A28A01);
            color: white;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            flex-shrink: 0;
        }
        
        #chat-header h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
            display: flex;
            align-items: center;
            text-transform: uppercase;
        }
        
        #chat-header h3::before {
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: #4CAF50;
            border-radius: 50%;
            margin-right: 8px;
            box-shadow: 0 0 5px #4CAF50;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
        }
        
        #close-chat {
            cursor: pointer;
            font-size: 22px;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s;
            background-color: rgba(255, 255, 255, 0.1);
        }
        
        #close-chat:hover {
            background-color: rgba(255, 255, 255, 0.2);
            transform: rotate(90deg);
        }
        
        #chat-messages {
            flex-grow: 1;
            padding: 15px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
            background-color: #000000;
            scrollbar-width: thin;
            scrollbar-color: #D1B261 #222;
            min-height: 0;
            max-height: calc(100% - 120px);
        }
        
        #chat-messages::-webkit-scrollbar {
            width: 6px;
        }
        
        #chat-messages::-webkit-scrollbar-track {
            background: #222;
            border-radius: 6px;
        }
        
        #chat-messages::-webkit-scrollbar-thumb {
            background-color: #D1B261;
            border-radius: 6px;
        }
        
        .user-message, .bot-message {
            max-width: 80%;
            padding: 10px 15px;
            border-radius: 18px;
            margin-bottom: 6px;
            box-shadow: 0 1px 2px rgba(0,0,0,0.2);
            animation: fadeIn 0.3s forwards;
            word-break: break-word;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .user-message {
            align-self: flex-end;
            background: linear-gradient(135deg, #D1B261, #A28A01);
            color: white;
            border-bottom-right-radius: 4px;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }
        
        .bot-message {
            align-self: flex-start;
            background-color: #222;
            color: #fff;
            border-bottom-left-radius: 4px;
            border: 1px solid #D1B261;
            border-width: 0 0 1px 1px;
        }
        
        #chat-input-container {
            display: flex;
            padding: 15px;
            border-top: 1px solid #D1B261;
            background-color: #000000;
            flex-shrink: 0;
        }
        
        #chat-input {
            flex-grow: 1;
            padding: 12px 15px;
            border: 1px solid #D1B261;
            border-radius: 25px;
            margin-right: 10px;
            background-color: #111;
            color: white;
            font-family: 'Montserrat', sans-serif;
            transition: all 0.3s;
        }
        
        #chat-input:focus {
            outline: none;
            border-color: #D1B261;
            box-shadow: 0 0 0 2px rgba(209, 178, 97, 0.3);
        }
        
        #chat-input::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }
        
        #chat-input-container button {
            background: linear-gradient(135deg, #D1B261, #A28A01);
            color: white;
            border: none;
            border-radius: 25px;
            padding: 10px 18px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(209, 178, 97, 0.4);
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }
        
        #chat-input-container button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(209, 178, 97, 0.5);
        }
        
        #chat-input-container button:active {
            transform: translateY(0);
        }
        
        #chat-input-container button::after {
            content: '→';
            margin-left: 5px;
            font-size: 16px;
            transition: transform 0.2s;
        }
        
        #chat-input-container button:hover::after {
            transform: translateX(3px);
        }
        
        .loader {
            border: 4px solid rgba(255, 255, 255, 0.1);
            border-top: 4px solid #D1B261;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 2s linear infinite;
            margin: 20px auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .error, .no-data {
            text-align: center;
            padding: 20px;
            color: #999;
        }
        
        .error {
            color: #D1B261;
        }
        
        .typing-indicator {
            display: flex;
            align-items: center;
            padding: 8px 15px;
            max-width: 60px;
            background-color: #222;
            border-radius: 18px;
            position: relative;
            border: 1px solid rgba(209, 178, 97, 0.3);
        }

        .typing-indicator span {
            height: 8px;
            width: 8px;
            float: left;
            margin: 0 1px;
            background-color: #D1B261;
            display: block;
            border-radius: 50%;
            opacity: 0.4;
        }
        
        .typing-indicator span:nth-of-type(1) {
            animation: typing 1s infinite;
        }
        
        .typing-indicator span:nth-of-type(2) {
            animation: typing 1s infinite 0.2s;
        }
        
        .typing-indicator span:nth-of-type(3) {
            animation: typing 1s infinite 0.4s;
        }

        @keyframes typing {
            0% { transform: translateY(0px); }
            33% { transform: translateY(-5px); }
            66% { transform: translateY(0px); }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            #chat-container {
                width: 85%;
                max-width: 320px;
                right: 10px;
                height: 400px;
            }
            
            #chat-button {
                width: 50px;
                height: 50px;
                font-size: 12px;
            }
            
            .user-message, .bot-message {
                max-width: 85%;
                padding: 8px 12px;
            }
        }
    `;
    document.head.appendChild(style);

    // Update chat button with icon
    setTimeout(() => {
        const chatButton = document.getElementById('chat-button');
        if (chatButton) {
            chatButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
        }
    }, 100);
}

// Close popup when clicking outside
document.addEventListener('click', (event) => {
    const popup = document.getElementById('media-popup');
    if (event.target === popup) {
        closePopup();
    }
});

// Close popup with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closePopup();
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Show trending section by default
    showSection('trendins');

    // Add active class to trending tab
    document.querySelector('.tab-button').classList.add('active');
});
