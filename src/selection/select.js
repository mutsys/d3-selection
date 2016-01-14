import {Selection} from "./index";
import selector from "../selector";

export default function(select) {
  if (typeof select !== "function") select = selector(select);

  for (var groups = this._, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], update = group._update, n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        if (update) update[i] = subnode, delete group[i];
        subgroup[i] = subnode;
      }
    }
    subgroup._parent = group._parent;
  }

  return new Selection(subgroups);
};