// resume-builder.js

document.addEventListener('DOMContentLoaded', () => {
  // Track current step (1‐5)
  let currentStep = 1;
  const totalSteps = 5;

  // Helper to show a given step and hide the rest
  function showStep(step) {
    // Update step indicators
    document.querySelectorAll('.step-indicator .step').forEach((el, idx) => {
      el.classList.toggle('active', idx === (step - 1));
    });

    // Show/hide step <section> elements
    document.querySelectorAll('.form-step').forEach((section) => {
      const stepNum = parseInt(section.dataset.step, 10);
      section.classList.toggle('active', stepNum === step);
      section.classList.toggle('hidden', stepNum !== step);
    });
  }

  // Initialize: show step 1
  showStep(currentStep);

  // NAVIGATION BUTTONS
  document.getElementById('nextBtn1').addEventListener('click', () => {
    // Basic validation: ensure required fields on step 1 are filled
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const location = document.getElementById('location').value.trim();
    if (!fullName || !email || !phone || !location) {
      alert('Please fill in all required fields.');
      return;
    }
    currentStep = 2;
    showStep(currentStep);
  });

  document.getElementById('prevBtn2').addEventListener('click', () => {
    currentStep = 1;
    showStep(currentStep);
  });
  document.getElementById('nextBtn2').addEventListener('click', () => {
    // Validate step 2 fields
    const branch = document.getElementById('branch').value;
    const rank = document.getElementById('rank').value.trim();
    const serviceStart = document.getElementById('serviceStart').value;
    const serviceEnd = document.getElementById('serviceEnd').value;
    const dutyStation = document.getElementById('dutyStation').value.trim();
    const mos = document.getElementById('mos').value.trim();
    const resp = document.getElementById('militaryResponsibilities').value.trim();
    if (
      !branch ||
      !rank ||
      !serviceStart ||
      !serviceEnd ||
      !dutyStation ||
      !mos ||
      !resp
    ) {
      alert('Please fill in all required military fields.');
      return;
    }
    currentStep = 3;
    showStep(currentStep);
  });

  document.getElementById('prevBtn3').addEventListener('click', () => {
    currentStep = 2;
    showStep(currentStep);
  });
  document.getElementById('nextBtn3').addEventListener('click', () => {
    // For simplicity, just move on (you could validate that at least one job is filled)
    currentStep = 4;
    showStep(currentStep);
  });

  document.getElementById('prevBtn4').addEventListener('click', () => {
    currentStep = 3;
    showStep(currentStep);
  });
  document.getElementById('nextBtn4').addEventListener('click', () => {
    // Ensure soft & hard skills are entered
    const soft = document.getElementById('softSkills').value.trim();
    const hard = document.getElementById('hardSkills').value.trim();
    if (!soft || !hard) {
      alert('Please enter both soft and hard skills.');
      return;
    }
    currentStep = 5;
    showStep(currentStep);
  });

  document.getElementById('prevBtn5').addEventListener('click', () => {
    currentStep = 4;
    showStep(currentStep);
  });

  // DYNAMICLY ADD/REMOVE BLOCKS

  // Add Employment block
  document.getElementById('addEmployment').addEventListener('click', () => {
    const container = document.getElementById('employmentContainer');
    const newBlock = container.querySelector('.employment-block').cloneNode(true);
    // Clear values in cloned inputs
    newBlock.querySelectorAll('input, textarea').forEach((input) => {
      input.value = '';
    });
    container.appendChild(newBlock);
  });

  // Add Education block
  document.getElementById('addEducation').addEventListener('click', () => {
    const container = document.getElementById('educationContainer');
    const newBlock = container.querySelector('.education-block').cloneNode(true);
    newBlock.querySelectorAll('input, select').forEach((input) => {
      input.value = '';
    });
    container.appendChild(newBlock);
  });

  // Add Certification block
  document.getElementById('addCert').addEventListener('click', () => {
    const container = document.getElementById('certContainer');
    const newBlock = container.querySelector('.cert-block').cloneNode(true);
    newBlock.querySelectorAll('input').forEach((input) => {
      input.value = '';
    });
    container.appendChild(newBlock);
  });

  // FINAL: Generate Resume
  document.getElementById('generateResume').addEventListener('click', async () => {
    // Disable button & show a “loading” message
    const btn = document.getElementById('generateResume');
    btn.disabled = true;
    btn.textContent = 'Generating…';
    document.getElementById('statusMessage').textContent = 'Please wait while we generate your resume.';

    // GATHER ALL DATA INTO AN OBJECT
    const data = {};

    // Step 1
    data.fullName = document.getElementById('fullName').value.trim();
    data.email = document.getElementById('email').value.trim();
    data.phone = document.getElementById('phone').value.trim();
    data.linkedin = document.getElementById('linkedin').value.trim();
    data.location = document.getElementById('location').value.trim();

    // Step 2
    data.branch = document.getElementById('branch').value;
    data.rank = document.getElementById('rank').value.trim();
    data.serviceStart = document.getElementById('serviceStart').value;
    data.serviceEnd = document.getElementById('serviceEnd').value;
    data.dutyStation = document.getElementById('dutyStation').value.trim();
    data.mos = document.getElementById('mos').value.trim();
    data.militaryResponsibilities = document.getElementById('militaryResponsibilities').value.trim();
    data.honors = document.getElementById('honors').value.trim();

    // Step 3 (collect all employment blocks)
    data.employment = [];
    document.querySelectorAll('.employment-block').forEach((block) => {
      const title = block.querySelector('.jobTitle').value.trim();
      const company = block.querySelector('.companyName').value.trim();
      const loc = block.querySelector('.jobLocation').value.trim();
      const start = block.querySelector('.jobStart').value;
      const end = block.querySelector('.jobEnd').value;
      const desc = block.querySelector('.jobDesc').value.trim();
      if (title && company && loc && start && end && desc) {
        data.employment.push({ title, company, loc, start, end, desc });
      }
    });

    // Step 3 (education)
    data.education = [];
    document.querySelectorAll('.education-block').forEach((block) => {
      const degree = block.querySelector('.degree').value;
      const inst = block.querySelector('.institution').value.trim();
      const loc = block.querySelector('.eduLocation').value.trim();
      const gradYear = block.querySelector('.graduationYear').value;
      const major = block.querySelector('.major').value.trim();
      if (degree && inst && loc && gradYear && major) {
        data.education.push({ degree, institution: inst, loc, gradYear, major });
      }
    });

    // Step 4
    data.softSkills = document.getElementById('softSkills').value
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s);
    data.hardSkills = document.getElementById('hardSkills').value
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s);
    data.certifications = [];
    document.querySelectorAll('.cert-block').forEach((block) => {
      const name = block.querySelector('.certName').value.trim();
      const year = block.querySelector('.certYear').value;
      if (name && year) {
        data.certifications.push({ name, year });
      }
    });

    // STEP 5 does not collect new fields; it's just “Review & Generate.”

    try {
      // SEND TO BACKEND
      const response = await fetch('/api/generateResume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const result = await response.json();
      // Assume result has { resumeText: "...markdown or plain‐text resume..." }

      // Use a client‐side PDF generator (e.g. html2pdf) or just show the text in a new window
      const resumeWindow = window.open('', '_blank');
      resumeWindow.document.write('<pre style="font-family:Courier,monospace;white-space:pre-wrap;">');
      resumeWindow.document.write(result.resumeText);
      resumeWindow.document.write('</pre>');

      document.getElementById('statusMessage').textContent = 'Resume generated! Check the new window/tab.';
    } catch (err) {
      console.error(err);
      document.getElementById('statusMessage').textContent = 'Oops! Something went wrong. Please try again.';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Generate Resume';
    }
  });
});
