const chalk = require('chalk');
const os = require('os-utils');
const axios = require('axios');

// --- 1. KONFIGURASI ---
const config = {
    threads: 10,
    targetUrl: "https://website-anda.com",
    anchorText: "Jasa SEO Terbaik",
    template: "{Halo|Hai|Salam}, artikel ini sangat {bermanfaat|keren|luar biasa}. Terima kasih! [LINK]",
    proxySource: "https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all"
};

let proxyList = [];

// --- 2. FUNGSI SPINTAX INTERNAL ---
function unspin(text) {
    return text.replace(/{([^{}]*)}/g, (match, options) => {
        const choices = options.split('|');
        return choices[Math.floor(Math.random() * choices.length)];
    });
}

// --- 3. PROXY SCRAPER (Gratis & Otomatis) ---
async function refreshProxies() {
    try {
        const response = await axios.get(config.proxySource);
        proxyList = response.data.split('\r\n').filter(p => p.length > 0);
        console.log(chalk.magenta(`[SYSTEM] Proxy Refreshed: ${proxyList.length} proxies loaded.`));
    } catch (err) {
        console.log(chalk.red(`[ERROR] Failed to fetch proxies: ${err.message}`));
    }
}

// --- 4. ENGINE GENERATOR KOMENTAR ---
function generateComment() {
    const raw = unspin(config.template);
    const anchor = `<a href="${config.targetUrl}">${config.anchorText}</a>`;
    return raw.replace("[LINK]", anchor);
}

// --- 5. WORKER THREAD LOGIC ---
async function runThread(id) {
    console.log(chalk.blue(`[Thread ${id}] Initialized.`));
    
    while (true) {
        try {
            // Ambil proxy acak
            const currentProxy = proxyList[Math.floor(Math.random() * proxyList.length)];
            const comment = generateComment();

            // LOGIKA POSTING (Placeholder untuk request HTTP)
            // Di sini nanti bot akan melakukan 'axios.post' ke target website
            
            // Output Notifikasi Sukses
            console.log(chalk.green(`[SUCCESS] T${id} | Proxy: ${currentProxy || 'Direct'} | RAM: ${(os.freememPercentage() * 100).toFixed(0)}% Free`));
            console.log(chalk.white(`       > Msg: ${comment.substring(0, 40)}...`));

            // Jeda Stabilizer (5-10 detik)
            await new Promise(res => setTimeout(res, 5000 + (Math.random() * 5000)));
        } catch (err) {
            console.log(chalk.gray(`[FAILED] T${id} | Runtime Error: ${err.message}`));
            await new Promise(res => setTimeout(res, 2000));
        }
    }
}

// --- 6. INITIALIZATION ---
async function init() {
    console.clear();
    console.log(chalk.cyan("====================================="));
    console.log(chalk.cyan("      GHOST LINK BUILDER v1.0       "));
    console.log(chalk.cyan("    Status: ULTRA-LIGHTWEIGHT       "));
    console.log(chalk.cyan("====================================="));

    // Load proxy pertama kali
    await refreshProxies();
    
    // Refresh proxy setiap 15 menit
    setInterval(refreshProxies, 15 * 60 * 1000);

    // Monitor CPU secara berkala
    setInterval(() => {
        os.cpuUsage((v) => {
            if (v > 0.8) console.log(chalk.red(`[!] CPU Warning: ${(v * 100).toFixed(0)}%`));
        });
    }, 10000);

    // Jalankan threads secara bertahap
    for (let i = 1; i <= config.threads; i++) {
        setTimeout(() => runThread(i), i * 1500); 
    }
}

init();
