let slideIndex = 0;
function showSlides() {
    let slides = document.getElementsByClassName("slides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

window.onload = function () {
    showSlides();

    // Animate topics on scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.topic').forEach(el => {
        observer.observe(el);
    });

    // Modal functionality
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close');
    const topicDetails = {
        sql: `<h2>SQL Injection</h2>
              <p>
              SQL Injection is a vulnerability that allows an attacker to interfere with the queries an application makes to its database. By injecting malicious SQL code through user input fields, attackers can read sensitive data, modify or delete records, and in some cases, execute administrative operations on the database.
              </p>
              <p><strong>Example:</strong> An input like <code>' OR '1'='1</code> in a login form might allow access without valid credentials.</p>
              <p><strong>How to Prevent:</strong></p>
              <ul>
              <li>Use <strong>prepared statements</strong> (parameterized queries) instead of string concatenation.</li>
              <li>Use <strong>ORMs (Object Relational Mappers)</strong> that abstract raw SQL.</li>
              <li>Limit database permissions to the least privilege required.</li>
              <li>Validate and sanitize all user inputs.</li>
              </ul>`,
        xss: `<h2>Cross-Site Scripting (XSS)</h2>
<p>
  XSS is a vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users. These scripts can steal cookies, session tokens, or redirect users to malicious sites.
</p>
<p><strong>Example:</strong> An attacker might inject <code>&lt;script&gt;alert(document.cookie)&lt;/script&gt;</code> in a comment box.</p>
<p><strong>Types of XSS:</strong></p>
<ul>
  <li><strong>Stored XSS:</strong> Malicious script is stored on the server and served to users.</li>
  <li><strong>Reflected XSS:</strong> Script is embedded in a URL and reflected back by the server.</li>
  <li><strong>DOM-based XSS:</strong> The vulnerability exists in the client-side code.</li>
</ul>
<p><strong>How to Prevent:</strong></p>
<ul>
  <li>Escape output for HTML, JavaScript, and URLs.</li>
  <li>Use security libraries like DOMPurify to sanitize input.</li>
  <li>Implement a strong <strong>Content Security Policy (CSP)</strong>.</li>
</ul>`,
        csrf: `<h2>Cross-Site Request Forgery (CSRF)</h2>
<p>
  CSRF is an attack that forces a logged-in user to perform unwanted actions on a web application in which they are authenticated. For example, changing account details or making a transaction without their consent.
</p>
<p><strong>Example:</strong> A hidden form on a malicious site submits a POST request to your bank’s server to transfer money using your logged-in session.</p>
<p><strong>How to Prevent:</strong></p>
<ul>
  <li>Use <strong>anti-CSRF tokens</strong> that must be submitted with each request.</li>
  <li>Enable <strong>SameSite cookies</strong> to restrict cross-origin usage of cookies.</li>
  <li>Verify <strong>Referer</strong> and <strong>Origin</strong> headers.</li>
  <li>Use user interaction checks (e.g., CAPTCHA) for critical actions.</li>
</ul>`,
        idor: `<h2>Insecure Direct Object References (IDOR)</h2>
<p>
  IDOR occurs when an application exposes internal implementation objects such as files, database records, or keys directly to users without proper authorization checks. Attackers can manipulate the input to access or modify data they shouldn’t have access to.
</p>
<p><strong>Example:</strong> Changing a URL from <code>/user/123/profile</code> to <code>/user/124/profile</code> to view another user’s data.</p>
<p><strong>How to Prevent:</strong></p>
<ul>
  <li>Never expose internal IDs or object references without validating user authorization.</li>
  <li>Implement access control checks on every request, not just at login.</li>
  <li>Use <strong>indirect references</strong> or opaque tokens instead of raw IDs.</li>
  <li>Log and monitor unusual access patterns.</li>
</ul>`,
        brokenauth: `
        <h2>Broken Authentication</h2>
<p>
  Broken authentication occurs when application functions related to authentication and session management are improperly implemented, allowing attackers to compromise passwords, keys, or session tokens.
</p>
<p><strong>Example:</strong> Predictable or exposed session tokens allow account takeover.</p>
<p><strong>How to Prevent:</strong> Use secure password storage, implement multi-factor authentication (MFA), and manage session tokens securely with expiration and regeneration.</p>
`,
        securitymisconfig: `
        <h2>Security Misconfiguration</h2>
<p>
  This happens when security settings are poorly configured or left with default settings, exposing sensitive data or functionality.
</p>
<p><strong>Example:</strong> A production server running in debug mode exposing stack traces.</p>
<p><strong>How to Prevent:</strong> Harden configurations, disable unused features, and regularly scan and patch the system.</p>
`,
        dataexposure: `
        <h2>Sensitive Data Exposure</h2>
<p>
  Sensitive information (like passwords, credit card numbers, etc.) is exposed due to weak encryption, poor key management, or insecure storage.
</p>
<p><strong>Example:</strong> Transmitting data over HTTP instead of HTTPS.</p>
<p><strong>How to Prevent:</strong> Use strong encryption (TLS/SSL), never store sensitive data unnecessarily, and follow best practices for key management.</p>
`,
        xxe: `
        <h2>XML External Entities (XXE)</h2>
<p>
  An XXE vulnerability occurs when XML parsers process external entity references within XML input, which can be exploited to access internal files or systems.
</p>
<p><strong>Example:</strong> Sending a malicious XML payload to read sensitive files.</p>
<p><strong>How to Prevent:</strong> Disable external entities and DTDs in XML parsers, and validate input.</p>
`,
        dirtraversal: `
        <h2>Directory Traversal</h2>
<p>
  Directory Traversal allows attackers to access files and directories outside the web root folder by manipulating file paths in user input.
</p>
<p><strong>Example:</strong> Accessing <code>/etc/passwd</code> on a Linux server using <code>../../../../etc/passwd</code>.</p>
<p><strong>How to Prevent:</strong> Sanitize and validate file paths, and restrict file access to specific directories only.</p>
`,
        cmdinjection: `
        <h2>Command Injection</h2>
<p>
  Command injection occurs when an attacker can execute arbitrary system commands on a server through user-supplied input.
</p>
<p><strong>Example:</strong> Injecting <code>; rm -rf /</code> into a form field processed by the system shell.</p>
<p><strong>How to Prevent:</strong> Avoid using shell commands with user input, use secure APIs, and validate all input.</p>
`,
        ssrf: `
        <h2>Server-Side Request Forgery (SSRF)</h2>
<p>
  SSRF occurs when a web server is tricked into making a request to an unintended location, potentially accessing internal systems or metadata.
</p>
<p><strong>Example:</strong> Accessing internal cloud metadata endpoints like <code>http://169.254.169.254/</code>.</p>
<p><strong>How to Prevent:</strong> Validate and restrict outbound requests, and use allow-lists for URLs.</p>
`,
        clickjacking: `
        <h2>Clickjacking</h2>
<p>
  Clickjacking tricks users into clicking on something different than what they perceive by placing a transparent layer over legitimate buttons or links.
</p>
<p><strong>Example:</strong> A hidden iframe over a "Like" button tricking users to share malicious content.</p>
<p><strong>How to Prevent:</strong> Use X-Frame-Options header or Content Security Policy (CSP) to prevent framing.</p>
`,
        fileupload: `
        <h2>Unrestricted File Upload</h2>
<p>
  Allowing users to upload files without validation can lead to remote code execution, data leaks, or other attacks if malicious files are uploaded.
</p>
<p><strong>Example:</strong> Uploading a PHP shell disguised as an image file.</p>
<p><strong>How to Prevent:</strong> Validate file types, restrict file extensions, store outside the web root, and scan files for malware.</p>
`,
        openredirect: `
        <h2>Open Redirects</h2>
<p>
  An open redirect occurs when an application redirects users to a URL specified by user input, which can be exploited in phishing or social engineering attacks.
</p>
<p><strong>Example:</strong> <code>https://example.com/redirect?url=malicious.com</code></p>
<p><strong>How to Prevent:</strong> Validate redirect URLs, avoid using user input for redirects, and use relative paths instead.</p>

        `
    };

    document.querySelectorAll('.learn-more').forEach(btn => {
        btn.addEventListener('click', function () {
            const topic = btn.getAttribute('data-topic');
            modalBody.innerHTML = topicDetails[topic] || "Details not found.";
            modal.style.display = "block";
        });
    });

    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}