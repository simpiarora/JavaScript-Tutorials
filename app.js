//Listen for submit
document.getElementById('loan-form').addEventListener('submit',function(e){
    //Hide Results
    document.getElementById('results').style.display = 'none';

    //Show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults,2000);
   e.preventDefault();
});

//Calculate Results
function calculateResults(){
    console.log('inside');
    //UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    //Calculations
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12; 
    const calculatedPayments = parseFloat(years.value) * 12 ;

    //Compute Monthly Payments
    const x = Math.pow(1 + calculatedInterest , calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);
    console.log(monthly);
    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        //Show Results
        document.getElementById('results').style.display = 'block';

        //Hide loader
        document.getElementById('loading').style.display = 'none';

    }else{
        showError('Please check your numbers');
    }

}

function showError(error){
    console.log('2');
    //Hide Results
    document.getElementById('results').style.display = 'none';

    //Hide loader
    document.getElementById('loading').style.display = 'none';
    
    //Create Error Div
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));
    //Get elements where you want to put this error
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //insert error above heading
    card.insertBefore(errorDiv,heading);

    //Clear error after 3 seconds
    setTimeout(clearError ,3000);
}

function clearError(){
    document.querySelector('.alert').remove();
}