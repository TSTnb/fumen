// Add-on
// onBeforeUnload

window.onbeforeunload=function(){
  if(!mini&&updateflag){
    return STRING_DESTROY_CONFIRM;
  }
}
