function MinecraftColorCodes() {
  this.parse = function(e) {
    e = "&r" + e;
    const r = [],
      o = [],
      t = /&[0-9a-fklmnor]/g;
    for (; null != (match = t.exec(e));) r.push({
      color: match[0],
      index: match.index
    });
    return r.forEach((t, a) => {
      const c = r[a].color,
        l = r[a].index,
        s = r[a + 1] && r[a + 1].index ? r[a + 1].index : e.length,
        x = e.substring(l + 2, s);
      switch (c) {
        case "&0":
          k = {
            color: "black",
            text: x
          };
          break;
        case "&1":
          k = {
            color: "dark_blue",
            text: x
          };
          break;
        case "&2":
          k = {
            color: "dark_green",
            text: x
          };
          break;
        case "&3":
          k = {
            color: "dark_aqua",
            text: x
          };
          break;
        case "&4":
          k = {
            color: "dark_red",
            text: x
          };
          break;
        case "&5":
          k = {
            color: "dark_purple",
            text: x
          };
          break;
        case "&6":
          k = {
            color: "gold",
            text: x
          };
          break;
        case "&7":
          k = {
            color: "gray",
            text: x
          };
          break;
        case "&8":
          k = {
            color: "dark_gray",
            text: x
          };
          break;
        case "&9":
          k = {
            color: "blue",
            text: x
          };
          break;
        case "&a":
          k = {
            color: "green",
            text: x
          };
          break;
        case "&b":
          k = {
            color: "aqua",
            text: x
          };
          break;
        case "&c":
          k = {
            color: "red",
            text: x
          };
          break;
        case "&d":
          k = {
            color: "light_purple",
            text: x
          };
          break;
        case "&e":
          k = {
            color: "yellow",
            text: x
          };
          break;
        case "&f":
          k = {
            color: "white",
            text: x
          };
          break;
        case "&k":
          k = {
            color: o[a - 1]?.color ?? "white",
            mode: "obfuscated",
            text: x
          };
          break;
        case "&l":
          k = {
            color: o[a - 1]?.color ?? "white",
            mode: "bold",
            text: x
          };
          break;
        case "&m":
          k = {
            color: o[a - 1]?.color ?? "white",
            mode: "strikethrough",
            text: x
          };
          break;
        case "&n":
          k = {
            color: o[a - 1]?.color ?? "white",
            mode: "underline",
            text: x
          };
          break;
        case "&o":
          k = {
            color: o[a - 1]?.color ?? "white",
            mode: "italic",
            text: x
          };
          break;
        case "&r":
          k = {
            color: "white",
            mode: "reset",
            text: x
          }
      }
      o.push(k)
    }), o.filter(e => "" !== e.text)
  },
  styleMap: {
    colors: {},
    modes: {}   
  }
};
