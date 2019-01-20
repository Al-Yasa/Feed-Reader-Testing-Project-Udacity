$(function() {

    // This suite is all about the RSS feeds
    describe('RSS Feeds', () => {
        // storing a URL matching regex in a variable, from: https://www.regextester.com/94502
        const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

        // This tests to make sure that the allFeeds variable is defined and that it is not empty.
        it('container variable is defined and not empty', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // This tests to make sure that each feed has a properly defined URL and that the URL is not empty
        it('URL\'s are defined properly and not empty', () => {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
                expect(feed.url).toMatch(URL_REGEX);
            }
        });

        // This tests to make sure that each feed has a name defined and that the name is not empty
        it('name\'s are defined and not empty', () => {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });

    // This suite is all about the menu
    describe('The menu', () => {
        // storing a reference of the body and menu elements in variables
        const BODY = document.querySelector('body');
        const MENU = document.querySelector('.menu-icon-link');

        // This tests to make sure that the menu element is hidden by default by checking the classes of the body element
        it('is hidden on first launch', () => {
            expect(BODY.classList.value).toContain('menu-hidden');
        });

        // This tests to make sure that the menu changes visibility when clicked by clicking the menu programmatically then checking the classes of the body element
         it('changes visibility when clicked (visible\\hidden)', () => {
            MENU.click(); // simulating a mouse click on the menu element
            expect(BODY.classList.value).not.toContain('menu-hidden');
            MENU.click(); // simulating a mouse click on the menu element
            expect(BODY.classList.value).toContain('menu-hidden');
        });
    });

    // This suite is all about the entries
    describe('Initial Entries', () => {
            // storing a reference of the feed container element in a variable
            const FEED = document.querySelector('.feed');

            // This hook is to make sure that the loadFeed() function runs to completion before we start testing
            beforeEach(done => loadFeed(0, done));

            // This tests to make sure that there is at least a single .entry element withing the .feed container
            it('at least one article exists', () => {
                expect(FEED.children.length).toBeGreaterThan(0);
                expect(FEED.children[0].children[0].classList.value).toContain('entry'); // does the article element have a class of 'entry'
            });
    });

    // This suite is all about the RSS feeds updating
    describe('New Feed Selection', function() {
        // storing a reference of the .feed container element in a variable and declaring feed1 and feed2 variables
        const FEED = document.querySelector('.feed');
        let feed1, feed2;

        // this hook is to store the HTML markup of .feed container element after running the loadFeed() function with different indexes
        beforeEach(done => {
            loadFeed(1, () => {
                feed2 = FEED.innerHTML;
                loadFeed(0, () => {
                    feed1 = FEED.innerHTML;
                    done();
                });
            });
        });

        // This tests to make sure the content actually changes by comparing the HTML markup that resulted from running the loadFeed() function with different indexes
        it('feed changes', () => expect(feed2).not.toBe(feed1));
    });

}());
