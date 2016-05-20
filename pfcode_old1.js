// Add-on
// Conversion into diagram code

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

addon_ui += '<input type=button value="Convert into Diagram code" onclick="outputpfcode();"><br>';
addon_ui += '<textarea name=pfcode id=pfcode cols=32 rows=25 style="font-size:9pt;" onfocus="this.select();"></textarea><br>';

function outputpfcode()
{
	var pfcode = document.getElementById("pfcode");
	var pfout = "";

	var tf = new Array(220);
	for (var i = 0; i < 220; i++) tf[i] = f[i];
	if (p[0] > 0){
		for (var i = 0; i < 4; i++) {
			tf[p[2] + b[p[0] * 32 + p[1] * 8 + i * 2 + 1] * 10 + b[p[0] * 32 + p[1] * 8 + i * 2] - 11] = p[0] + 8;
		}
	}

	var st = 20;
	for (var j = 20; j >= 0; j--) {
		for (var i = 0; i < 10; i++) {
			if (tf[j * 10 + i]) st = j - (j > 0);
		}
	}

	pfout += "|{{pfstart}}\n";
	for (var j = st; j < 21; j++) {
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
