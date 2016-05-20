// Add-on
// Frame listing

if(typeof STRING_LISTING_SHOW_CAPTION   == 'undefined') STRING_LISTING_SHOW_CAPTION   = "コメントリスト";
if(typeof STRING_LISTING_SHOW_ALLFRAMES == 'undefined') STRING_LISTING_SHOW_ALLFRAMES = "全ページリスト";
if(typeof STRING_LISTING_AUTOJUMP       == 'undefined') STRING_LISTING_AUTOJUMP       = "自動的に移動";
if(typeof STRING_LISTING_JUMP           == 'undefined') STRING_LISTING_JUMP           = "移動";

addon_ui += '<hr width=90% size=1>';
addon_ui += '<table border=0 cellspacing=0 cellpadding=0>';
addon_ui += '<td><input type=button value="'+STRING_LISTING_SHOW_CAPTION+'" onclick="flistupdate(1);">';
addon_ui += '<td><input type=button value="'+STRING_LISTING_SHOW_ALLFRAMES+'" onclick="flistupdate(0);">';
addon_ui += '<td><input type=checkbox name=autojump id=autojump checked><label for=autojump>'+STRING_LISTING_AUTOJUMP+'</label>';
addon_ui += '</table>';
addon_ui += '<select name=flist id=flist onchange="if(autojump.checked)flistjump();"><option value=0>[1]</option></select>';
addon_ui += '<input type=button value="'+STRING_LISTING_JUMP+'" onclick="flistjump();"><br>';

function flistupdate(futype)
{
  var flist=document.getElementById("flist");
  var autojump=document.getElementById("autojump");
  pushframe(frame);
  flist.length=0;
  fucmstrpast='';
  for(fui=0;fui<=framemax;fui++){
    fucmstr=ac[fui];
    if(fucmstr){
      if(fucmstr.substring(0,3)=='#Q='){
        fuinstr=fucmstr.indexOf(';');
        if(fuinstr>=0){
          fucmstr='#Q=...;'+fucmstr.substring(fuinstr+1);
        }else{
          fucmstr='#Q=...;';
        }
      }
    }
    if(futype==0||fui==0||fucmstr!=""&&fucmstr!=fucmstrpast){
      flist.length++;
      flist.options[flist.length-1].text="["+(fui+1)+"]"+fucmstr.substring(0,40)+(fucmstr.length>40?"...":"");
      if(fui<=frame)flist.selectedIndex=flist.length-1;
    }
    fucmstrpast=fucmstr;
  }
}

function flistjump()
{
  var flist=document.getElementById("flist");
  var pgnm=document.getElementById("pgnm");
  fji=flist.selectedIndex;
  fjinstr1=flist.options[fji].text.indexOf('[');
  fjinstr2=flist.options[fji].text.indexOf(']');
  fjpg=0;
  if(fjinstr1>=0&&fjinstr2>fjinstr1){
    fjpg=flist.options[fji].text.substring(fjinstr1+1,fjinstr2);
  }
  if(!(fjpg>=0))fjpg=0;
  pgnm.value=fjpg;
  pgset();
}
