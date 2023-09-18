  function getAge(dateString) {
    var now = new Date();
    var dob = new Date(dateString);
    
    var years = now.getFullYear() - dob.getFullYear();
    var months = now.getMonth() - dob.getMonth();
    var days = now.getDate() - dob.getDate();
    var hours = now.getHours() - dob.getHours();

    if (hours < 0) {
      hours += 24;
      days--;
    }
    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    var ageString = years + " years, " + months + " months, " + days + " days, and " + hours + " hours old";
    return ageString;
  }

  console.log(getAge('05/04/1997'));

