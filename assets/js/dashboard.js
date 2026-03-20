/*
    Industrial Safety Equipment Supplier - dashboard.js
*/

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // Sidebar Toggle
    // -------------------------------------------------------------------------
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarClose = document.getElementById('sidebar-close');
    const sidebar = document.querySelector('.dashboard-sidebar');

    sidebarToggle?.addEventListener('click', () => {
        sidebar?.classList.add('active');
    });

    sidebarClose?.addEventListener('click', () => {
        sidebar?.classList.remove('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 992) {
            if (sidebar?.classList.contains('active') && !sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });

    // -------------------------------------------------------------------------
    // Dummy Charts / Analytics (using Chart.js placeholder logic)
    // -------------------------------------------------------------------------
    // This is a placeholder since we only use CDN-based Chart.js if needed.
    // For now, I'll provide logic that could initialize some visual elements.
    const chartCanvas = document.getElementById('salesChart');
    if (chartCanvas) {
        // Mock chart logic if library is available
        if (typeof Chart !== 'undefined') {
            new Chart(chartCanvas, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Sales ($)',
                        data: [12000, 19000, 3000, 5000, 2000, 3000],
                        borderColor: '#004a99',
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
        }
    }

    // -------------------------------------------------------------------------
    // Order Status Updates / Reorder Flow
    // -------------------------------------------------------------------------
    const reorderBtns = document.querySelectorAll('.reorder-btn');
    reorderBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.target.closest('[data-id]')?.dataset.id;
            alert(`Product ${productId} added to cart for reorder!`);
        });
    });

    // -------------------------------------------------------------------------
    // Mobile Sidebar Logic
    // -------------------------------------------------------------------------
    if (window.innerWidth < 992) {
        sidebar?.classList.add('sidebar-hidden');
    }
});
