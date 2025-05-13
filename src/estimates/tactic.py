from __future__ import annotations

from abc import ABC, abstractmethod
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from estimates.proofstate import ProofState

## Tactics are operations that can transform a proof state into one or more proof states.


class Tactic(ABC):
    @abstractmethod
    def activate(self, state: ProofState) -> list[ProofState]:
        """
        Activate the tactic on the given proof state.  Will return any proof states that remain after applying the tactic.
        """
        ...

    @abstractmethod
    def __str__(self) -> str: ...
