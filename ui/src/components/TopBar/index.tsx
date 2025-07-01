import { BookOpen, Code, Network } from "lucide-react";
import {
  selectIsMobile,
  selectShowCode,
  selectShowExamplesModal,
  selectShowTutorial,
  setShowCode,
  setShowExamplesModal,
  setShowTutorial,
} from "../../features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import ExecutionButton from "./ExecutionButton";
import TopBarButton from "./TopBarButton";

export default function TopBar(): React.ReactElement {
  const showTutorials = useAppSelector(selectShowTutorial);
  const showCode = useAppSelector(selectShowCode);
  const showExamplesModal = useAppSelector(selectShowExamplesModal);
  const dispatch = useAppDispatch();

  const isMobile = useAppSelector(selectIsMobile);

  return (
    <div className="flex border-b border-gray-200 px-4 py-2 items-center justify-between">
      {/* Show or hide tutorial and code panels */}
      <div className="flex items-center gap-1 md:gap-2">
        <TopBarButton
          icon={<BookOpen className="h-4 w-4" />}
          label="Tutorials"
          active={showTutorials}
          onClick={() => {
            dispatch(setShowTutorial(!showTutorials));
            if (isMobile && showCode) dispatch(setShowCode(false));
          }}
        />
        <TopBarButton
          icon={<Code className="h-4 w-4" />}
          label="Code"
          active={showCode}
          onClick={() => {
            dispatch(setShowCode(!showCode));
            if (isMobile && showTutorials) dispatch(setShowTutorial(false));
          }}
        />
        {isMobile && (
          <TopBarButton
            icon={<Network className="h-4 w-4" />}
            label="Builder"
            active={!showCode && !showTutorials}
            onClick={() => {
              dispatch(setShowTutorial(false));
              dispatch(setShowCode(false));
            }}
          />
        )}
        {!isMobile && (
          <TopBarButton
            icon={<Network className="h-4 w-4" />}
            label="Examples"
            active={showExamplesModal}
            onClick={() => {
              dispatch(setShowExamplesModal(!showExamplesModal));
            }}
          />
        )}
      </div>

      {/* Compile and run code, either automatically or manually */}
      <ExecutionButton />
    </div>
  );
}
