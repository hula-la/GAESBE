/**
 * Prompts a user when they exit the page
 */

import { useCallback, useContext, useEffect } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import Swal from 'sweetalert2';

function useConfirmExit(
  confirmExit: () => boolean | Promise<void>,
  when = true,
) {
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!when) {
      return;
    }

    const push = navigator.push;

    navigator.push = (...args: Parameters<typeof push>) => {
      const result = confirmExit();
      console.log(result);
      if (result !== false) {
        push(...args);
      }
    };

    return () => {
      navigator.push = push;
    };
  }, [navigator, confirmExit, when]);
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

  // const confirmExit = useCallback(() => {
  //   const confirm = window.confirm('정말 나갈겁니까?');
  //   return confirm;
  // const confirmExit = useCallback(async () => {
  const confirmExit = async () => {
    await Swal.fire({
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      } else {
        return false;
      }
    });
    // }, [message]);
  };
  useConfirmExit(confirmExit, when);
}
