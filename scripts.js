/* =================== navbar =================================== */
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.dropdown-toggle').forEach(item => {
        item.addEventListener('click', function () {
            if (window.innerWidth < 992) {
                const arrow = this.querySelector('.dropdown__arrow');
                arrow.style.transform = this.getAttribute('aria-expanded') === 'true'
                    ? 'rotate(180deg)'
                    : 'rotate(0deg)';
            }
        });
    });

    document.querySelector('#navbarNav').addEventListener('click', function (e) {
        if (window.innerWidth >= 992) return;
        const target = e.target;
        if (target.closest('.nav-link:not(.dropdown-toggle)') || target.closest('.btn')) {
            e.preventDefault();
            e.stopPropagation();
            const navbarCollapse = document.querySelector('.navbar-collapse');
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            bsCollapse.hide();
            const link = target.closest('a');
            if (link && link.href && !link.href.endsWith('#')) {
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300);
            }
        }
    });
});
/* =================== navbar =================================== */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel with options
    const myCarousel = new bootstrap.Carousel(document.getElementById('financialCarousel'), {
        interval: 5000,
        wrap: true,
        pause: 'hover'
    });

    // Add click event to all "Know More" buttons
    document.querySelectorAll('.btn-custom').forEach(button => {
        button.addEventListener('click', function() {
            // Replace with your actual action
            console.log('Know More button clicked');
            // window.location.href = '/learn-more'; // Example navigation
        });
    });
});

// ============================= loan ============================

const images = [
    "assests/images/step1.png?v=123",
    "assests/images/step2.png?v=456",
    "assests/images/step3.png?v=789"
];
let currentStep = 0;

function changeStep(step) {
    currentStep = step;
    $("#stepImage").css("opacity", 0);
    setTimeout(() => {
        $("#stepImage").attr("src", images[step]);
        $("#stepImage").css("opacity", 1);
    }, 500);

    $(".step").removeClass("active");
    $(".step-number").removeClass("bg-primary").addClass("bg-secondary");

    $(".step").eq(step).addClass("active");
    $(".step").eq(step).find(".step-number").removeClass("bg-secondary").addClass("bg-primary");
}

$(".step").click(function () {
    let step = $(this).data("step");
    changeStep(step);
});

function autoSlide() {
    currentStep = (currentStep + 1) % images.length;
    changeStep(currentStep);
}

setInterval(autoSlide, 3000);
// ============================= loan ============================

// <!-- ==================== calculator ==================== -->

document.addEventListener("DOMContentLoaded", function () {
    const loanAmountSlider = document.getElementById("loanAmount");
    const tenureSlider = document.getElementById("tenure");

    const loanAmountValue = document.getElementById("loanAmountValue");
    const tenureValue = document.getElementById("tenureValue");

    const monthlyEMI = document.getElementById("monthlyEMI");
    const totalInterest = document.getElementById("totalInterest");
    const totalAmount = document.getElementById("totalAmount");
    const displayLoanAmount = document.getElementById("displayLoanAmount");

    const interestRate = 18; // Fixed interest rate (18% per annum)

    function calculateEMI() {
        let P = parseInt(loanAmountSlider.value); // Loan Amount
        let N = parseInt(tenureSlider.value); // Tenure in Months
        let R = interestRate / 12 / 100; // Monthly Interest Rate

        // EMI Calculation Formula
        let EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
        let totalPayable = EMI * N;
        let totalInterestAmount = totalPayable - P;

        // Update the values in UI
        monthlyEMI.textContent = Math.round(EMI).toLocaleString();
        totalInterest.textContent = Math.round(totalInterestAmount).toLocaleString();
        totalAmount.textContent = Math.round(totalPayable).toLocaleString();
        displayLoanAmount.textContent = P.toLocaleString();
        loanAmountValue.textContent = P.toLocaleString();
        tenureValue.textContent = N;
    }

    // Event listeners to update values dynamically
    loanAmountSlider.addEventListener("input", calculateEMI);
    tenureSlider.addEventListener("input", calculateEMI);

    // Initial Calculation
    calculateEMI();
});

// <!-- ==================== calculator ==================== --> 