import { forwardRef, ReactNode } from "react"
import {
  Box,
  Collapse,
  Fade,
  Grow,
  Slide,
  SlideProps,
  Zoom,
} from "@mui/material"

type TransitionType = "grow" | "fade" | "collapse" | "slide" | "zoom"
type TransitionPosition =
  | "top-left"
  | "top-right"
  | "top"
  | "bottom-left"
  | "bottom-right"
  | "bottom"
type TransitionDirection = SlideProps["direction"]

interface TransitionsProps {
  children?: ReactNode
  type?: TransitionType
  position?: TransitionPosition
  direction?: TransitionDirection
}

const Transitions = forwardRef<HTMLDivElement, TransitionsProps>(
  (
    {
      children,
      position = "top-left",
      type = "grow",
      direction = "up",
      ...others
    },
    ref
  ) => {
    let positionSX: { transformOrigin: string } = {
      transformOrigin: "0 0 0",
    }

    switch (position) {
      case "top-right":
        positionSX = {
          transformOrigin: "top right",
        }
        break
      case "top":
        positionSX = {
          transformOrigin: "top",
        }
        break
      case "bottom-left":
        positionSX = {
          transformOrigin: "bottom left",
        }
        break
      case "bottom-right":
        positionSX = {
          transformOrigin: "bottom right",
        }
        break
      case "bottom":
        positionSX = {
          transformOrigin: "bottom",
        }
        break
      case "top-left":
      default:
        positionSX = {
          transformOrigin: "0 0 0",
        }
        break
    }

    return (
      <Box ref={ref}>
        {type === "grow" && (
          <Grow {...(others as any)}>
            <Box sx={positionSX}>{children}</Box>
          </Grow>
        )}
        {type === "collapse" && (
          <Collapse {...(others as any)} sx={positionSX}>
            {children}
          </Collapse>
        )}
        {type === "fade" && (
          <Fade
            {...(others as any)}
            timeout={{
              appear: 500,
              enter: 600,
              exit: 400,
            }}
          >
            <Box sx={positionSX}>{children}</Box>
          </Fade>
        )}
        {type === "slide" && (
          <Slide
            {...(others as any)}
            timeout={{
              appear: 0,
              enter: 400,
              exit: 200,
            }}
            direction={direction}
          >
            <Box sx={positionSX}>{children}</Box>
          </Slide>
        )}
        {type === "zoom" && (
          <Zoom {...(others as any)}>
            <Box sx={positionSX}>{children}</Box>
          </Zoom>
        )}
      </Box>
    )
  }
)

export default Transitions
