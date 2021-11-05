const copyCode = (() => {

    function getCopy(ele){
      //  debugger;
        var row = ele.closest('tr');
        var getBacId = row.cells[4].textContent;
        var getValue = row.cells[5].value = "?bacid=" + getBacId;
        var aux = document.createElement("input");
      
        aux.setAttribute("value", ele.value = getValue);
      
        document.body.appendChild(aux);
      
        aux.select();
      
        //getValue.select();
        document.execCommand("copy");
      
        document.body.removeChild(aux);
        event.preventDefault();
        document.querySelector(".alert-success").classList.remove("d-none");
        document.querySelector(".alert-success").classList.add("show");
        document.querySelector(".alert-success").classList.add("d-block");
        effects.scrollIt(
          document.querySelector('.sidebar-header'),
          300,
          'easeOutQuad'
        );
      
        setTimeout(function () {
          document.querySelector(".alert-success").classList.remove("show");
          document.querySelector(".alert-success").classList.remove("d-block");
          document.querySelector(".alert-success").classList.add("d-none");
        }, 4000);
      
      
      }
      return {
        getCopy,
        name: "copyCode"
      }
})();

export { copyCode };