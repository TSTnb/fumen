// Add-on
// Conversion into diagram code
// Rev.3

/*
Jan 13, 2011 18:11
Help with fumen

Chopin>
Hi, Mihys.
This is Chopin from harddrop.com and I was wondering if I could ask you if something is possible.
I need to see if fumen can convert into a diagram code to put in our Tetr!s wiki at harddrop.com/wiki.
Please contact (PM) message me at harddrop.com/chopin if you can.
Big help appreciated!
*/

if(typeof STRING_WIKICODE_OUTPUT    == 'undefined') STRING_WIKICODE_OUTPUT    = "Wikiコード出力";
if(typeof STRING_WIKICODE_UPPERCASE == 'undefined') STRING_WIKICODE_UPPERCASE = "大文字";

addon_ui += '<hr width=90% size=1>';
addon_ui += '<table border=0 cellspacing=0 cellpadding=0>';
addon_ui += '<td><input type=button value="'+STRING_WIKICODE_OUTPUT+'" onclick="outputpfcode();">';
addon_ui += '<td><input type=checkbox name=pfucase id=pfucase checked><label for=pfucase>'+STRING_WIKICODE_UPPERCASE+'</label><td>';
addon_ui += '</table>';
addon_ui += '<textarea name=pfcode id=pfcode cols=32 rows=4 style="font-size:9pt;" onfocus="this.select();"></textarea><br>';

function outputpfcode()
{
	var pfcode = document.getElementById("pfcode");
	var pfucase = document.getElementById("pfucase");
	var pfout = "";

	var tf = new Array(fldblks);
	for (var i = 0; i < fldblks; i++) tf[i] = f[i] + ((pfucase.checked && f[i] >= 1 && f[i] <= 8) ? 8 : 0);
	if (p[0] > 0) {
		for (var i = 0; i < 4; i++) {
			tf[p[2] + b[p[0] * 32 + p[1] * 8 + i * 2 + 1] * 10 + b[p[0] * 32 + p[1] * 8 + i * 2] - 11] = p[0] + 8;
		}
	}

	var st = fldlines - 2;
	for (var j = fldlines - 2; j >= 0; j--) {
		for (var i = 0; i < 10; i++) {
			if (tf[j * 10 + i]) st = j - (j > 0);
		}
	}

	pfout += "|{{pfstart}}\n";
	for (var j = st; j < fldlines - 1; j++) {
		pfout += "{{pfrow";
		for (var i = 0; i < 10; i++) {
			pfout += "|" + " iloztjsgILOZTJSG".charAt(tf[j * 10 + i]);
		}
		pfout += "}}\n";
	}
	pfout += "{{pfend}}\n";

	pfcode.value = pfout;
	pfcode.focus();
}
