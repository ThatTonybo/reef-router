/*
    reef-router 1.0
    Created by ThatTonybo (github.com/ThatTonybo)
    Licensed under the MIT License
*/

class ReefRouter {
    constructor(opts) {
        this.main = opts.main;
        this.pages = opts.pages;
        this.defaultPage = opts.defaultPage || Object.keys(this.pages)[0];
        this.appName = opts.appName || 'My App';
        this.updatePageTitle = opts.updatePageTitle || true;
        this.pageTitleFormat = opts.pageTitleFormat || '{title} | {appName}';

        document.addEventListener('render', async (event) => {
            console.log(this.updatePageTitle)

            if (this.updatePageTitle) {
                const title = await this.getPageTitle(this.defaultPage);
                document.title = title;
            }

            const params = new URLSearchParams(window.location.search);
            const id = params.get('p');

            if (history.state) {
                opts.main.data.page = history.state.id;
                if (this.updatePageTitle) {
                    const title = await this.getPageTitle(history.state.id);
                    document.title = title;
                }
            }

            if (id) {
                opts.main.data.page = id;
                if (this.updatePageTitle) {
                    const title = await this.getPageTitle(id);
                    document.title = title;
                }
            }
        }, false);        
    }

    async getPageTitle(id) {
        return new Promise((resolve, reject) => {
            const str = this.pageTitleFormat
            .replace('{title}', this.pages[id])
            .replace('{id}', id)
            .replace('{appName}', this.appName);

            return resolve(str);
        });
    }

    change(elem) {
        const id = document.getElementById(elem).getAttribute('router-page');

        if (!this.pages[id]) return;
    
        history.pushState({ id }, this.getPageTitle(id), `?p=${id}`);        

        this.main.data.page = id;
    }
}