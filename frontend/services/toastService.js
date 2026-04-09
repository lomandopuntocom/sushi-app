// Toast notification service
class ToastService {
    constructor() {
        this.createContainer();
    }

    createContainer() {
        // Check if container already exists
        if (document.getElementById('toast-container')) {
            return;
        }

        const container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }

    show(message, duration = 3000, type = 'success') {
        const container = document.getElementById('toast-container');

        const toast = document.createElement('div');
        toast.style.cssText = `
            background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 16px 24px;
            border-radius: 4px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease-out;
            pointer-events: auto;
            cursor: default;
            max-width: 300px;
            word-wrap: break-word;
        `;
        toast.textContent = message;

        // Add animation keyframes if not already present
        if (!document.getElementById('toast-animations')) {
            const style = document.createElement('style');
            style.id = 'toast-animations';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        container.appendChild(toast);

        // Auto-remove after duration
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, duration);
    }

    success(message, duration = 3000) {
        this.show(message, duration, 'success');
    }

    error(message, duration = 3000) {
        this.show(message, duration, 'error');
    }

    info(message, duration = 3000) {
        this.show(message, duration, 'info');
    }
}

export const toastService = new ToastService();
export default toastService;
