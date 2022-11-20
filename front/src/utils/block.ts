/**
 * Prompts a user when they exit the page
 */

import { useContext, useEffect } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import Swal from 'sweetalert2';

function useConfirmExit(message: string, when = true) {
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!when) {
      return;
    }

    const push = navigator.push;

    navigator.push = (...args: Parameters<typeof push>) => {
      Swal.fire({
        text: message,
        icon: 'warning',
        showCancelButton: true,
        focusCancel: true,
        cancelButtonText: '아니오 기록해줘요',
        confirmButtonText: '네 나갈래요',
      }).then((result) => {
        if (result.isConfirmed) {
          push(...args);
        }
      });
    };

    return () => {
      navigator.push = push;
    };
  }, [navigator, when]);
}

export function usePrompt(message: string, when = true) {
  useEffect(() => {
    if (when) {
      window.onbeforeunload = function () {
        return message;
      };
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [message, when]);

  useConfirmExit(message, when);
}
