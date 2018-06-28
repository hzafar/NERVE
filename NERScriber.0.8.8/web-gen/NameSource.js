class NameSource {
	constructor(value) {
		this.__value = value;
	}
	toString() {
		return this.__value;
	}
	static __isTransient() {
		return true;
	}
	static __getClass() {
		return "ca.sharcnet.nerve.context.NameSource";
	}
	static __isEnum() {
		return true;
	}
};
NameSource.valueArray = [];
NameSource.valueArray.push(NameSource.NAME = new NameSource("NAME"));
NameSource.valueArray.push(NameSource.DICTIONARY = new NameSource("DICTIONARY"));
NameSource.valueArray.push(NameSource.DIALOG = new NameSource("DIALOG"));
NameSource.valueArray.push(NameSource.NERMAP = new NameSource("NERMAP"));
NameSource.values = function(){return NameSource.valueArray;};

if (typeof module !== "undefined") module.exports = NameSource;