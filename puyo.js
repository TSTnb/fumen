// Add-on
// Puyo Rensa assistance
// Rev.1

if(typeof STRING_PUYO_ADD        == 'undefined') STRING_PUYO_ADD        = "ぷよ:";
if(typeof STRING_PUYO_ADD3COLORS == 'undefined') STRING_PUYO_ADD3COLORS = "3色";
if(typeof STRING_PUYO_ADD4COLORS == 'undefined') STRING_PUYO_ADD4COLORS = "4色";
if(typeof STRING_PUYO_ADD5COLORS == 'undefined') STRING_PUYO_ADD5COLORS = "5色";
if(typeof STRING_PUYO_AUTOADD    == 'undefined') STRING_PUYO_AUTOADD    = "自動:";
if(typeof STRING_PUYO_HIT2KATA   == 'undefined') STRING_PUYO_HIT2KATA   = "固";
if(typeof STRING_PUYO_HIT2TETSU  == 'undefined') STRING_PUYO_HIT2TETSU  = "鉄";
if(typeof STRING_PUYO_EXPORT     == 'undefined') STRING_PUYO_EXPORT     = "-&gt; 出力";

addon_ui += '<hr width=90% size=1>';
addon_ui += '<table border=0 cellspacing=0 cellpadding=0>';
addon_ui += '<tr>';
addon_ui += '<td align=center>'+STRING_PUYO_ADD+'</td>';
addon_ui += '<td align=center><input type=button value="'+STRING_PUYO_ADD3COLORS+'" onclick="addpuyo(3);dblclickchk=1;" ondblclick="if(dblclickchk==0)addpuyo(3);"></td>';
addon_ui += '<td align=center><input type=button value="'+STRING_PUYO_ADD4COLORS+'" onclick="addpuyo(4);dblclickchk=1;" ondblclick="if(dblclickchk==0)addpuyo(4);"></td>';
addon_ui += '<td align=center><input type=button value="'+STRING_PUYO_ADD5COLORS+'" onclick="addpuyo(5);dblclickchk=1;" ondblclick="if(dblclickchk==0)addpuyo(5);"></td>';
addon_ui += '<td><input type=radio name=puyohit2 id=puyohit2kata><label for=puyohit2kata>'+STRING_PUYO_HIT2KATA+'</label></td>';
addon_ui += '<td><input type=radio name=puyohit2 id=puyohit2tetsu checked><label for=puyohit2tetsu>'+STRING_PUYO_HIT2TETSU+'</label></td>';
addon_ui += '</tr>';
addon_ui += '<td align=center>'+STRING_PUYO_AUTOADD+'</td>';
addon_ui += '<td align=center><input type=checkbox name=puyoanx3 id=puyoanx3 onclick="puyoautonext(3);"></td>';
addon_ui += '<td align=center><input type=checkbox name=puyoanx4 id=puyoanx4 onclick="puyoautonext(4);"></td>';
addon_ui += '<td align=center><input type=checkbox name=puyoanx5 id=puyoanx5 onclick="puyoautonext(5);"></td>';
addon_ui += '</table>';
addon_ui += '<table border=0 cellspacing=0 cellpadding=0>';
addon_ui += '<td><input type=button name=puyokml id=puyokml value="&lt;" onclick="puyokmove(-1);dblclickchk=1;" ondblclick="if(dblclickchk==0)puyokmove(-1);" style="width:32px;"></td>';
addon_ui += '<td><input type=button name=puyokmd id=puyokmd value="v" onclick="puyokdrop(1);dblclickchk=1;" ondblclick="if(dblclickchk==0)puyokdrop(1);" style="width:32px;"></td>';
addon_ui += '<td><input type=button name=puyokmr id=puyokmr value="&gt;" onclick="puyokmove(1);dblclickchk=1;" ondblclick="if(dblclickchk==0)puyokmove(1);" style="width:32px;"></td>';
addon_ui += '<td><input type=button name=puyokrl id=puyokrl value="(" onclick="puyokrot(1);dblclickchk=1;" ondblclick="if(dblclickchk==0)puyokrot(1);" style="width:32px;"></td>';
addon_ui += '<td><input type=button name=puyokrr id=puyokrr value=")" onclick="puyokrot(-1);dblclickchk=1;" ondblclick="if(dblclickchk==0)puyokrot(-1);" style="width:32px;"></td>';
addon_ui += '<td><input type=password name=puyokbd id=puyokbd size=1 maxlength=8 value="" onfocus="puyokeybuttontext(true);refresh();puyokeyevent();" onblur="puyokeybuttontext(false);refresh();puyokeyevent();" onkeydown="puyokeyevent();" onkeyup="puyokeyevent();" onchange="puyokeyevent();" style="width:32px;text-align:center;"></td>';
addon_ui += '</table>';
addon_ui += '<table align=center border=0 cellspacing=0 cellpadding=0>';
addon_ui += '<td><input type=button value="'+STRING_FRAME_FIRST+'" onclick="pgprev(2);dblclickchk=1;" ondblclick="if(dblclickchk==0)pgprev(2);"></td>';
addon_ui += '<td><input type=button name=puyoprev id=puyoprev value="'+STRING_FRAME_PREVIOUS+'" onclick="pgprev(0);dblclickchk=1;" ondblclick="if(dblclickchk==0)pgprev(0);"></td>';
addon_ui += '<td><input type=button name=puyonx id=puyonx value="'+STRING_FRAME_NEXT+'" onclick="updatepuyo();dblclickchk=1;" ondblclick="if(dblclickchk==0)updatepuyo();"></td>';
addon_ui += '<td><input type=button value="'+STRING_FRAME_LAST+'" onclick="pgnext(2);dblclickchk=1;" ondblclick="if(dblclickchk==0)pgnext(2);"></td>';
addon_ui += '</table>';
addon_ui += '<table border=0 cellspacing=0 cellpadding=0>';
addon_ui += '<tr>';
addon_ui += '<td align=center rowspan=2><input type=button value="'+STRING_PUYO_EXPORT+'" onclick="exportpuyo();"></td>';
addon_ui += '<td><input type=text name=puyourl1 id=puyourl1 size=24 onfocus="this.select();"</td>';
addon_ui += '</tr>';
addon_ui += '<tr>';
addon_ui += '<td><input type=text name=puyourl2 id=puyourl2 size=24 onfocus="this.select();"</td>';
addon_ui += '</tr>';
addon_ui += '</table>';

function puyoautonext(colors){
  var puyoanx3=document.getElementById("puyoanx3");
  var puyoanx4=document.getElementById("puyoanx4");
  var puyoanx5=document.getElementById("puyoanx5");
  if(colors==3&&puyoanx3.checked){puyoanx4.checked=false;puyoanx5.checked=false;}
  if(colors==4&&puyoanx4.checked){puyoanx3.checked=false;puyoanx5.checked=false;}
  if(colors==5&&puyoanx5.checked){puyoanx3.checked=false;puyoanx4.checked=false;}
}

function checkpuyofield(x,y){
  for(var j=1;j<14;j++){
    for(var i=0;i<8;i++){
      if(!(j>=0&&j<=12&&i>=1&&i<=6)&&(f[(y+j)*10+(x+i)]!=2)){
        return 0;
      }
    }
  }
  return 1;
}

function findpuyofield(){
  for(var j=fldlines-15;j>=0;j--){
    for(var i=0;i<3;i++){
      if(checkpuyofield(i,j)){return j*10+i;}
    }
  }
  return -1;
}

function droppuyo(checkonly){
  var fb=findpuyofield();
  if(fb<0)return -1;
  var ret=0;
  for(var j=fb+126;j>=0&&j>=fb-89;j-=((j+90-fb)%10==1)?5:1){
    if(f[j]==0||f[j]==2)continue;
    var i=j;
    for(;i<fb+121;i+=10){
      if(f[i+10]>0)break;
    }
    if(i>j){
      if(!checkonly){
        f[i]=f[j];
        f[j]=0;
      }
      ret=1;
    }
    if(i<fb){
      if(f[i]>0)ret=1;
      if(!checkonly){
        f[i]=0;
      }
    }
  }
  return ret;
}

function erasepuyo(checkonly){
  var puyohit2=document.getElementsByName("puyohit2");
  var kata=puyohit2[0].checked;
  var fb=findpuyofield();
  if(fb<0)return -1;
  var ret=0;
  var cc=new Array(fldblks);
  var rc=new Array(72);
  for(var i=0;i<fldblks;i++)cc[i]=-1;
  for(var i=0;i<fldblks;i++)rc[i]=i;
  for(var j=0;j<12;j++){
    for(var i=0;i<6;i++){
      var pos=fb+11+j*10+i;
      if(cc[pos]>=0)continue;
      var cnt=1;
      for(var rp=0;rp<2;rp++){
        pos=fb+11+j*10+i;
        var dat=f[pos];
        var st=0;
        while(st>=0&&st<72){
          cc[pos]=rp?cnt:0;
          var nx;
          nx=pos+ 1;if(nx>=fb+10&&f[nx]==dat&&cc[nx]<rp){cnt+=(1-rp);st++;rc[st]=pos;pos=nx;continue;}
          nx=pos- 1;if(nx>=fb+10&&f[nx]==dat&&cc[nx]<rp){cnt+=(1-rp);st++;rc[st]=pos;pos=nx;continue;}
          nx=pos+10;if(nx>=fb+10&&f[nx]==dat&&cc[nx]<rp){cnt+=(1-rp);st++;rc[st]=pos;pos=nx;continue;}
          nx=pos-10;if(nx>=fb+10&&f[nx]==dat&&cc[nx]<rp){cnt+=(1-rp);st++;rc[st]=pos;pos=nx;continue;}
          pos=rc[st];
          st--;
        }
      }
    }
  }
  for(var j=0;j<12;j++){
    for(var i=0;i<6;i++){
      var pos=fb+11+j*10+i;
      if(cc[pos]>=4&&f[pos]>=3&&f[pos]<=7){
        if(!checkonly){
          f[pos]=0;
          if(f[pos+ 1]==8)f[pos+ 1]=0;
          if(f[pos- 1]==8)f[pos- 1]=0;
          if(f[pos+10]==8)f[pos+10]=0;
          if(f[pos-10]==8)f[pos-10]=0;
          if(kata){
            if(f[pos+ 1]==1)f[pos+ 1]=8;
            if(f[pos- 1]==1)f[pos- 1]=8;
            if(f[pos+10]==1)f[pos+10]=8;
            if(f[pos-10]==1)f[pos-10]=8;
          }
        }
        ret=1;
      }
    }
  }
  return ret;
}

function updatepuyo(){
  var dc=document.getElementById("dc");
  var newpage=(frame>=framemax);
  if(newpage&&framemax>=framelim-1)return -1;
  var ret=0;
  pgnext(0);
  if(newpage&&dc.checked){
    if(droppuyo(0)>0){
      ret=1;
    }else{
      if(erasepuyo(0)>0){
        ret=1;
      }
    }
  }
  if(ret){
    shiftfield(-1);
  }
  refresh();
  return ret;
}

function setnextpuyo(t,v){
  var fb=findpuyofield();
  if(fb<0)return -1;
  if(t<=0){
    var sy=4-Math.floor(fb/10);
    for(var i=0;i<sy;i++){
      shiftfield(3);
      v+=10*81;
    }
    fb=findpuyofield();
    for(var i=0;i<10;i++){
      f[fldblks-10+i]=0;
    }
    for(var j=0;j<9;j++){
      for(var i=0;i<6;i++){
        f[fb-89+j*10+i]=0;
      }
    }
    var pos=fb-27;
    var rot=0;
    if(t<0){
      pos=Math.floor(v/81)%fldblks;
      rot=Math.floor(v/(81*fldblks))%4;
    }
    f[fldblks-10+pos%10]=(rot==2)?1:8;
    if(rot==1||rot==3)f[fldblks-10+pos%10+((rot==1)?(-1):(rot==3)?(1):(0))]=1;
    f[pos]=v%9;
    f[pos+((rot==0)?(-10):(rot==1)?(-1):(rot==2)?(10):(rot==3)?(1):(0))]=Math.floor(v/9)%9;
    return;
  }
  if(t>=1&&t<=19){
    var x1;
    var x3;
    var p1;
    var p2;
    var p3;
    var p4;
    var sx=fb%10;
    for(var j=0;j<sx;j++){
      shiftfield(1);
      for(var i=0;i<9;i++)f[fldblks-10+i]=f[fldblks-10+i+1];
      f[fldblks-10+9]=0;
    }
    if(t<=11){
      x1=fb%10+8+(t-1)%2;
      x3=fb%10+8+1-(t-1)%2;
      p1=fb-32+(t-1)*20+(t-1)%2;
      p3=fb-32+(t-1)*20+1-(t-1)%2;
    }else{
      x1=fb%10+7-(t-12);
      x3=x1;
      p1=fb+147+((t-12)%2)*20-(t-12);
      p3=fb+147+(1-(t-12)%2)*20-(t-12);
    }
    p2=p1+10;
    p4=p3+10;
    var sy=Math.floor(p2/10)-(fldlines-2);
    for(var i=0;i<sy;i++){
      shiftfield(0);
    }
    fb=findpuyofield();
    if(t<=11){
      x1=fb%10+8+(t-1)%2;
      x3=fb%10+8+1-(t-1)%2;
      p1=fb-32+(t-1)*20+(t-1)%2;
      p3=fb-32+(t-1)*20+1-(t-1)%2;
    }else{
      x1=fb%10+7-(t-12);
      x3=x1;
      p1=fb+147+((t-12)%2)*20-(t-12);
      p3=fb+147+(1-(t-12)%2)*20-(t-12);
    }
    p2=p1+10;
    p4=p3+10;
    f[p2]=v%9;
    f[p1]=Math.floor(v/9)%9;
    f[p4]=0;
    f[p3]=0;
    return;
  }
}

function getnextpuyo(t){
  var fb=findpuyofield();
  if(fb<0)return -1;
  if(t<=0){
    var x=fb%10+1;
    var cnt1=0;
    var fnd1=-1;
    var cnt2=0;
    var fnd2=-1;
    for(var i=0;i<6;i++)if(f[fldblks-10+x+i]==8){fnd1=i;cnt1++;}
    for(var i=0;i<6;i++)if(f[fldblks-10+x+i]==1){fnd2=i;cnt2++;}
    var ax=fb-29+((cnt1==1)?fnd1:(cnt2==1)?fnd2:(-1));
    var axd=(ax>=0&&f[ax]>=3&&f[ax]<=7)?f[ax]:(-1);
    var chcnt=0;
    var chd=-1;
    var chrot=0;
    if(axd>=0){
      var ch;
      ch=ax-10;if(ch>=0&&ch<fldblks-10&&(ch+fldblks-fb)%10>=1&&(ch+fldblks-fb)%10<=6&&f[ch]>=3&&f[ch]<=7){chrot=0;chd=f[ch];chcnt++;}
      ch=ax- 1;if(ch>=0&&ch<fldblks-10&&(ch+fldblks-fb)%10>=1&&(ch+fldblks-fb)%10<=6&&f[ch]>=3&&f[ch]<=7){chrot=1;chd=f[ch];chcnt++;}
      ch=ax+10;if(ch>=0&&ch<fldblks-10&&(ch+fldblks-fb)%10>=1&&(ch+fldblks-fb)%10<=6&&f[ch]>=3&&f[ch]<=7){chrot=2;chd=f[ch];chcnt++;}
      ch=ax+ 1;if(ch>=0&&ch<fldblks-10&&(ch+fldblks-fb)%10>=1&&(ch+fldblks-fb)%10<=6&&f[ch]>=3&&f[ch]<=7){chrot=3;chd=f[ch];chcnt++;}
    }
    if(chcnt!=1)return 0;
    return axd%9+chd%9*9+ax*81+chrot*81*fldblks;
  }
  if(t>=1&&t<=19){
    var x1;
    var p1;
    var p2;
    if(t<=11){
      x1=fb%10+8+(t-1)%2;
      p1=fb-32+(t-1)*20+(t-1)%2;
    }else{
      x1=fb%10+7-(t-12);
      p1=fb+147+((t-12)%2)*20-(t-12);
    }
    p2=p1+10;
    if(!(x1>=0&&x1<=9))return 0;
    if(!(p1>=0&&p1<fldblks-10))return 0;
    if(!(p2>=0&&p2<fldblks-10))return 0;
    if(f[p1]<3||f[p1]>7)return 0;
    if(f[p2]<3||f[p2]>7)return 0;
    return f[p2]%9+f[p1]%9*9+p2*81+0*81*fldblks;
  }
}

function addpuyo(colors){
  var pp=document.getElementById("pp");
  var puyoanx3=document.getElementById("puyoanx3");
  var puyoanx4=document.getElementById("puyoanx4");
  var puyoanx5=document.getElementById("puyoanx5");
  if(colors==3){puyoanx3.checked=true;puyoanx4.checked=false;puyoanx5.checked=false;}
  if(colors==4){puyoanx3.checked=false;puyoanx4.checked=true;puyoanx5.checked=false;}
  if(colors==5){puyoanx3.checked=false;puyoanx4.checked=false;puyoanx5.checked=true;}
  var fb=findpuyofield();
  if(fb<0){
    pgnext(2);
    var fnd;
    for(fnd=0;fnd<fldblks;fnd++)if(f[fnd]>0)break;
    if(fnd<fldblks||p[0]>0){
      if(framemax>=framelim-1)return;
      var ret=0;
      pgnext(0);
      for(var i=0;i<fldblks;i++)f[i]=0;
      p[0]=0;p[1]=0;p[2]=0;pp.checked=false;keybuttonenable(false);
    }
    var x=0;
    var y=9;
    for(var j=1;j<14;j++){
      for(var i=0;i<8;i++){
        f[(y+j)*10+(x+i)]=((j<=12&&i>=1&&i<=6)?0:2);
      }
    }
  }
  var dst=0;
  for(var src=0;src<20;src++){
    var dat=getnextpuyo(src);
    if(dat>0){
      if(src>dst){
        setnextpuyo(dst,dat);
        setnextpuyo(src,0);
      }
      dst++;
    }
  }
  if(dst<20)setnextpuyo(dst,(colors<=0)?0:((3+(4+2*Math.floor(Math.random()*colors))%5)+(3+(4+2*Math.floor(Math.random()*colors))%5)*9));
  shiftfield(-1);
}

function puyokmove(mov){
  var newpage=(frame>=framemax);
  if(!newpage)return;
  var fb=findpuyofield();
  if(fb<0)return;
  var v=getnextpuyo(-1);
  if(v==0)return;
  var axd=v%9;
  var chd=Math.floor(v/9)%9;
  var ax=Math.floor(v/81)%fldblks;
  var chrot=Math.floor(v/(81*fldblks))%4;
  var x=ax%10;
  if(x+mov>=fb%10+1+(chrot==1)&&x+mov<=fb%10+6-(chrot==3))ax+=mov;
  setnextpuyo(-1,axd%9+chd%9*9+ax*81+chrot*81*fldblks);
  shiftfield(-1);
}

function puyokdrop(dwn){
  var dc=document.getElementById("dc");
  var puyoanx3=document.getElementById("puyoanx3");
  var puyoanx4=document.getElementById("puyoanx4");
  var puyoanx5=document.getElementById("puyoanx5");
  var newpage=(frame>=framemax);
  if(!newpage)return;
  if(framemax>=framelim-1)return;
  var fb=findpuyofield();
  if(fb<0)return;
  if(droppuyo(1)||erasepuyo(1)||puyoanx3.checked||puyoanx4.checked||puyoanx5.checked){
    dc.checked=true;
    if((updatepuyo()==0||!droppuyo(1)&&!erasepuyo(1))){
      if(puyoanx3.checked){
        addpuyo(3);
      }else if(puyoanx4.checked){
        addpuyo(4);
      }else if(puyoanx5.checked){
        addpuyo(5);
      }else{
        addpuyo(0);
      }
      shiftfield(-1);
    }
  }
}

function puyokrot(rot){
  var newpage=(frame>=framemax);
  if(!newpage)return;
  var fb=findpuyofield();
  if(fb<0)return;
  var v=getnextpuyo(-1);
  if(v==0)return;
  var axd=v%9;
  var chd=Math.floor(v/9)%9;
  var ax=Math.floor(v/81)%fldblks;
  var chrot=Math.floor(v/(81*fldblks))%4;
  var x=ax%10;
  chrot=(chrot+4+rot)%4;
  ax+=(x<fb%10+1+(chrot==1))-(x>fb%10+6-(chrot==3));
  setnextpuyo(-1,axd%9+chd%9*9+ax*81+chrot*81*fldblks);
  shiftfield(-1);
}

function puyokeyevent(){
  var puyokbd=document.getElementById("puyokbd");
  var kbdval=puyokbd.value;
  while(!puyokbd.disabled&&kbdval.length>0){
    var kbdchr=kbdval.substring(0,1);
    if("Ss4".indexOf(kbdchr)>=0)puyokmove(-1);
    if("Dd2".indexOf(kbdchr)>=0)puyokdrop(1);
    if("Ee8 ".indexOf(kbdchr)>=0)puyokdrop(-1);
    if("Ff6".indexOf(kbdchr)>=0)puyokmove(1);
    if("ZzJj37".indexOf(kbdchr)>=0)puyokrot(1);
    if("XxKk159".indexOf(kbdchr)>=0)puyokrot(-1);
    if("VvAa".indexOf(kbdchr)>=0)pgprev(0);
    if("Bb;".indexOf(kbdchr)>=0)pgnext(0);
    kbdval=kbdval.substring(1);
  }
  puyokbd.value=kbdval;
}

function puyokeybuttontext(fcs){
  var puyokml=document.getElementById("puyokml");
  var puyokmd=document.getElementById("puyokmd");
  var puyokmr=document.getElementById("puyokmr");
  var puyokrl=document.getElementById("puyokrl");
  var puyokrr=document.getElementById("puyokrr");
  var puyoprev=document.getElementById("puyoprev");
  var puyonx=document.getElementById("puyonx");
  if(!mini){
    puyokml.value=fcs?"4":"<";
    puyokmd.value=fcs?"2":"v";
    puyokmr.value=fcs?"6":">";
    puyokrl.value=fcs?"Z":"(";
    puyokrr.value=fcs?"X":")";
    if(STRING_FRAME_PREVIOUS.substring(1,2)==" "){
      puyoprev.value=fcs?("V"+STRING_FRAME_PREVIOUS.substring(1)):STRING_FRAME_PREVIOUS;
    }
    if(STRING_FRAME_NEXT.substring(1,2)==" "){
      puyonx.value=fcs?("B"+STRING_FRAME_NEXT.substring(1)):STRING_FRAME_NEXT;
    }
  }
}

function exportpuyo(){
  var puyourl1=document.getElementById("puyourl1");
  var puyourl2=document.getElementById("puyourl2");
  var puyohit2=document.getElementsByName("puyohit2");
  var kata=puyohit2[0].checked;
  var fitbl=new Array(0,kata?9:8,7,4,1,5,3,2,6);
  var fptbl=new Array(0,kata?7:8,9,4,1,5,3,2,6);
  var ienctbl="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-?";
  var penctbl="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ[]";
  var iencstr="http://ips.karou.jp/simu/ps.html";
  var pencstr="http://www.puyop.com/s/";
  var ierrstr="";
  var perrstr="";
  var iwngstr="";
  var pwngstr="";
  var init1=0;
  var init2=0;
  var ffend=0;
  var nxcnt=0;
  var lastfrm=-1;
  pushframe(frame);
  for(var frm=0;frm<=framemax;frm++){
    if(ad[frm])continue;
    for(var i=0;i<fldblks;i++)f[i]=af[frm*fldblks+i];
    var fb=findpuyofield();
    if(fb<0)continue;
    lastfrm=frm;
  }
  for(var frm=0;frm<=lastfrm;frm++){
    if(ad[frm])continue;
    for(var i=0;i<fldblks;i++)f[i]=af[frm*fldblks+i];
    var fb=findpuyofield();
    if(fb<0)continue;
    if(!ffend){
      var ifldstrl="~";
      var pfldstrl="=";
      var ifldstrs="";
      var pfldstrs="";
      var ifldsdis=0;
      var pfldsdis=0;
      for(var i=fb+1;i<=fb+126;i+=((i-fb)%10==6)?5:1){
        ifldstrl=ifldstrl+ienctbl.charAt(fitbl[f[i]]%64);
        if((i-fb)%10==6){
          var nulc=0;
          for(;nulc<6;nulc++)if(fitbl[f[i-nulc]]%64>0)break;
          if(nulc>0)ifldstrl=ifldstrl.substring(0,ifldstrl.length-nulc)+(i<fb+126?".":"");
        }
        if(ifldstrl=="~.")ifldstrl="~";
        if(pfldstrl!="="||fptbl[f[i]]>0)pfldstrl=pfldstrl+penctbl.charAt(fptbl[f[i]]%64);
      }
      for(var i=fb+1;i<=fb+126;i+=((i-fb)%10==5)?6:2){
        ifldsdis|=(fitbl[f[i]]>7||fitbl[f[i+1]]>7);
        pfldsdis|=(fptbl[f[i]]>6||fptbl[f[i+1]]>6);
        if(ifldstrs!=""||fitbl[f[i]]>0||fitbl[f[i+1]]>0)ifldstrs=ifldstrs+ienctbl.charAt(fitbl[f[i+1]]%8+fitbl[f[i]]%8*8);
        if(pfldstrs!=""||fptbl[f[i]]>0||fptbl[f[i+1]]>0)pfldstrs=pfldstrs+penctbl.charAt(fptbl[f[i+1]]%8+fptbl[f[i]]%8*8);
      }
      if(!init1){iencstr=iencstr+"?";init1=1;}
      iencstr=iencstr+(ifldsdis?ifldstrl:ifldstrs);
      pencstr=pencstr+(pfldsdis?pfldstrl:pfldstrs);
      ffend=1;
    }
    var beg=(frm<lastfrm)?(-1):0;
    var end=(frm<lastfrm)?0:20;
    for(var src=beg;src<end;src++){
      var v=getnextpuyo(src);
      if(v>0){
        var axd=v%9;
        var chd=Math.floor(v/9)%9;
        var ax=Math.floor(v/81)%fldblks;
        var chrot=Math.floor(v/(81*fldblks))%4;
        var x=ax%10;
        if(!init1){iencstr=iencstr+"?";init1=1;}
        if(!init2){iencstr=iencstr+"_";pencstr=pencstr+"_";init2=1;}
        if(fitbl[axd]<1||fitbl[axd]>5||fitbl[chd]<1||fitbl[chd]>5){
          if(ierrstr=="")ierrstr="(Error:Tsumo@"+(frm+1)+"/"+(framemax+1)+")";
          if(perrstr=="")perrstr="(Error:Tsumo@"+(frm+1)+"/"+(framemax+1)+")";
        }else{
          iencstr=iencstr+ienctbl.charAt((fitbl[axd]-1)*2+(fitbl[chd]-1)*12);
          iencstr=iencstr+ienctbl.charAt(src>=0?1:((x-fb%10-1)*2+(4-chrot)%4*12));
          var pencdl=(fptbl[chd]-1)*1+(fptbl[axd]-1)*5+(4-chrot)%4*128+(src>=0?0:(x-fb%10))*512;
          if(nxcnt>=100){
            if(pwngstr=="")pwngstr="(Warning:Size@"+(frm+1)+"/"+(framemax+1)+")";
          }else{
            pencstr=pencstr+ienctbl.charAt(pencdl%64);
            pencstr=pencstr+ienctbl.charAt(Math.floor(pencdl/64));
          }
          nxcnt++;
        }
      }else if(src<=0){
        var atk=0;
        var hmin=6;
        var hmax=0;
        for(var x=1;x<=6;x++){
          atk*=7;
          for(var y=-1;y>=-9;y--){
            var pos=fb+y*10+x;
            if(pos>=0&&f[pos]!=0&&f[pos]!=8){
              if(ierrstr=="")ierrstr="(Error:Ojama@"+(frm+1)+"/"+(framemax+1)+")";
              if(perrstr=="")perrstr="(Error:Ojama@"+(frm+1)+"/"+(framemax+1)+")";
            }
            if(pos>=0&&f[pos]==8&&atk%7<6)atk++;
          }
          if(atk%7<hmin)hmin=atk%7;
          if(atk%7>hmax)hmax=atk%7;
        }
        if(hmax>0){
          if(hmax>5){
            if(ierrstr=="")ierrstr="(Error:Ojama@"+(frm+1)+"/"+(framemax+1)+")";
            if(perrstr=="")perrstr="(Error:Ojama@"+(frm+1)+"/"+(framemax+1)+")";
          }else if(hmax>hmin+1){
            if(ierrstr=="")ierrstr="(Error:Ojama@"+(frm+1)+"/"+(framemax+1)+")";
            if(perrstr=="")perrstr="(Error:Ojama@"+(frm+1)+"/"+(framemax+1)+")";
          }else{
            if(!init1){iencstr=iencstr+"?";init1=1;}
            if(!init2){iencstr=iencstr+"_";pencstr=pencstr+"_";init2=1;}
            var hit;
            var mod;
            hit=atk;
            mod=0;
            for(var x=0;x<6;x++){
              mod/=2;
              if(hit%7+1-hmax)mod+=32;
              hit=Math.floor(hit/7);
            }
            iencstr=iencstr+ienctbl.charAt(hmax*12-2);
            iencstr=iencstr+ienctbl.charAt(mod);
            hit=atk;
            mod=0;
            for(var x=0;x<6;x++){
              mod*=2;
              if(hit%7-hmin)mod++;
              hit=Math.floor(hit/7);
            }
            if(nxcnt>=100){
              if(pwngstr=="")pwngstr="(Warning:Size@"+(frm+1)+"/"+(framemax+1)+")";
            }else{
              pencstr=pencstr+penctbl.charAt(mod);
              pencstr=pencstr+penctbl.charAt(56+hmin);
            }
            nxcnt++;
          }
        }
      }
    }
  }
  popframe(frame);
  if(iwngstr!="")iencstr=iwngstr+iencstr;
  if(pwngstr!="")pencstr=pwngstr+pencstr;
  if(ierrstr!="")iencstr=ierrstr;
  if(perrstr!="")pencstr=perrstr;
  puyourl1.value=iencstr;
  puyourl2.value=pencstr;
}
