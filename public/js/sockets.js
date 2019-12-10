var socket = io.connect('http://localhost:8080',{'forceNew': true});

socket.on('tasks',function(data){
    render(data);
})

function render (data){
    var html = data.map(function(elem, index) {
        return(`
        <li class="list-group-item d-flex justify-content-between align-items-center">
                  ${elem.task}
                  <span class="text-primary">${elem.status}</span>
                </li>
                `);
      }).join(" ");
    
      document.getElementById('tasks').innerHTML = html;
}


function addTask(){
var payload ={
    task : document.getElementById('task').value,
    status : document.getElementById('status').value
};

socket.emit('new-task', payload);
return false;

}