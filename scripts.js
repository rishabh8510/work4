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
    $(".step-number").removeClass("bg-white").addClass("bg-light");

    $(".step").eq(step).addClass("active");
    $(".step").eq(step).find(".step-number").removeClass("bg-light").addClass("bg-white");
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

// document.addEventListener("DOMContentLoaded", function () {
//     const loanAmountSlider = document.getElementById("loanAmount");
//     const tenureSlider = document.getElementById("tenure");

//     const loanAmountValue = document.getElementById("loanAmountValue");
//     const tenureValue = document.getElementById("tenureValue");

//     const monthlyEMI = document.getElementById("monthlyEMI");
//     const totalInterest = document.getElementById("totalInterest");
//     const totalAmount = document.getElementById("totalAmount");
//     const displayLoanAmount = document.getElementById("displayLoanAmount");

//     const interestRate = 18; 

//     function calculateEMI() {
//         let P = parseInt(loanAmountSlider.value); 
//         let N = parseInt(tenureSlider.value); 
//         let R = interestRate / 12 / 100; 

      
//         let EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
//         let totalPayable = EMI * N;
//         let totalInterestAmount = totalPayable - P;

//         monthlyEMI.textContent = Math.round(EMI).toLocaleString();
//         totalInterest.textContent = Math.round(totalInterestAmount).toLocaleString();
//         totalAmount.textContent = Math.round(totalPayable).toLocaleString();
//         displayLoanAmount.textContent = P.toLocaleString();
//         loanAmountValue.textContent = P.toLocaleString();
//         tenureValue.textContent = N;
//     }

   
//     loanAmountSlider.addEventListener("input", calculateEMI);
//     tenureSlider.addEventListener("input", calculateEMI);


//     calculateEMI();
// });

function updateEMI() {
    let principal = parseFloat(document.getElementById("loanAmount").value);
    let tenure = parseInt(document.getElementById("loanTenure").value) * 12;
    let rate = parseFloat(document.getElementById("interestRate").value) / 1200;

    let emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
    let totalPayment = emi * tenure;
    let totalInterest = totalPayment - principal;

    document.getElementById("monthlyEMI").textContent = `₹${emi.toFixed(2)}`;
    document.getElementById("totalInterest").textContent = `₹${totalInterest.toFixed(2)}`;
    document.getElementById("totalPayment").textContent = `₹${totalPayment.toFixed(2)}`;

    updateChart(principal, totalInterest);
}

function updateChart(principal, interest) {
    let ctx = document.getElementById("emiChart").getContext("2d");
    if (window.emiChartInstance) {
        window.emiChartInstance.destroy();
    }
    window.emiChartInstance = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Principal", "Total Interest"],
            datasets: [{
                data: [principal, interest],
                backgroundColor: ["#ff7f50", "#f4f4f4"]
            }]
        }
    });
}

document.getElementById("loanAmount").addEventListener("input", function () {
    document.getElementById("loanAmountDisplay").value = this.value;
    updateEMI();
});
document.getElementById("loanTenure").addEventListener("input", function () {
    document.getElementById("loanTenureDisplay").value = this.value;
    updateEMI();
});
document.getElementById("interestRate").addEventListener("input", function () {
    document.getElementById("interestRateDisplay").value = this.value;
    updateEMI();
});

updateEMI();

// <!-- ==================== calculator ==================== --> 

document.addEventListener("DOMContentLoaded", function () {
    const marqueeContent = document.querySelector(".marquee-content");
    const testimonialCards = document.querySelectorAll(".testimonial-card");
    let index = 0;

    function showNextTestimonial() {
        index = (index + 1) % testimonialCards.length;
        marqueeContent.style.transform = `translateX(-${index * 100}%)`;
    }

    setInterval(showNextTestimonial, 4000); // 4 सेकंड बाद अगला Testimonial दिखेगा
});

//   <!-- ============================ Our  Partners ====================== -->

$(document).ready(function(){
    $('.customer-logos').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 3
            }
        }]
    });
});

//   <!-- ============================ Our  Partners ====================== -->

document.addEventListener("DOMContentLoaded", function () {
    const marquee = document.querySelector(".marquee-content");
    const marqueeContainer = document.querySelector(".marquee-container");

    if (marquee && marqueeContainer) {
        // First, reset any existing clones
        const existingClones = marquee.parentNode.querySelectorAll('.marquee-clone');
        existingClones.forEach(clone => clone.remove());

        // Create two clones (one for seamless looping)
        const clone1 = marquee.cloneNode(true);
        const clone2 = marquee.cloneNode(true);
        clone1.classList.add('marquee-clone');
        clone2.classList.add('marquee-clone');
        
        // Add spacing between items
        clone1.style.marginLeft = "30px";
        clone2.style.marginLeft = "30px";
        
        // Append clones
        marquee.parentNode.appendChild(clone1);
        marquee.parentNode.appendChild(clone2);

        // Calculate total width
        const marqueeWidth = marquee.scrollWidth;
        const containerWidth = marqueeContainer.offsetWidth;
        
        // Set container width to show full content during animation
        const totalWidth = (marqueeWidth * 3) + 60; // Original + 2 clones + spacing
        marqueeContainer.style.width = `${totalWidth}px`;

        // Create the animation
        const keyframes = [
            { transform: 'translateX(0)' },
            { transform: `translateX(-${marqueeWidth + 30}px)` } // Move by one marquee width + spacing
        ];
        
        const options = {
            duration: 20000, // 20 seconds
            iterations: ease
        };

        // Remove any existing animation
        marqueeContainer.style.animation = 'none';
        
        // Apply new animation
        marqueeContainer.animate(keyframes, options);
    }
});


