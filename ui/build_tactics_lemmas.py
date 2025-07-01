from estimates.tactic import Tactic
from estimates.lemma import *
from estimates.main import *
import json

tactic_data = []
for tactic_class in Tactic.__subclasses__():
    if tactic_class.__name__ == "UseLemma":
        continue
    tactic_data.append({
        "id": tactic_class.__name__,
        "label": tactic_class.label,
        "description": tactic_class.description,
        "className": tactic_class.__name__,
        "arguments": tactic_class.arguments,
    })
    
lemma_data = []
for lemma_class in Lemma.__subclasses__():
    lemma_data.append({
        "id": lemma_class.__name__,
        "label": lemma_class.label,
        "description": lemma_class.description,
        "className": lemma_class.__name__,
        "arguments": lemma_class.arguments,
    })

with open("ui/src/metadata/tactics.json", "w") as f:
    json.dump(tactic_data, f, indent=2)

with open("ui/src/metadata/lemmas.json", "w") as f:
    json.dump(lemma_data, f, indent=2)
