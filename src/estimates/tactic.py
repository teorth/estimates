from __future__ import annotations

from abc import ABC, abstractmethod
from typing import TYPE_CHECKING, Literal

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


    # Required properties for estimates-ui webapp integration
    
    @property
    @abstractmethod
    def label(self) -> str:
        """
        Short display name for the tactic button in the webapp UI.
        Should be concise (1-3 words) and user-friendly.
        """
        ...
    
    @property
    @abstractmethod
    def description(self) -> str:
        """
        User-facing explanation of what this tactic does.
        Displayed in full as a description in the webapp interface.
        Should be a few sentences long.
        """
        ...
    
    @property
    @abstractmethod
    def arguments(self) -> list[Literal["variables", "hypotheses", "verbose", "this", "expressions"]]:
        """
        Input types this tactic accepts from the webapp.
        Determines which UI input fields are shown to the user for this tactic.
        Valid options: variables, hypotheses, verbose, this, expressions
        """
        ...