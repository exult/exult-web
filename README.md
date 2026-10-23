[![CodeFactor](https://www.codefactor.io/repository/github/exult/exult-web/badge)](https://www.codefactor.io/repository/github/exult/exult-web)

The Exult website is published from a generated `dist/` directory. Seven Towers uses Markdown documentation, JSON catalogs, and HTML content fragments; neither building nor serving the site requires PHP.

## Build and preview

Install Node.js 22 or newer (CI uses Node.js 24), then run these commands from the repository root:

```sh
npm ci
npm run build
python3 -m http.server 8000 --directory dist
```

Open <http://localhost:8000/seventowers/>. The build works offline after dependencies have been installed. `dist/` is disposable and is recreated on every build. Serve this directory, rather than the repository root.

Run `npm test` to build and check documentation coverage, generated links and assets, syntax highlighting, exports, legacy route mappings, and publication contents. Run `python3 -m unittest discover -s tests` in a POSIX environment to test the snapshot metadata generator; on Windows, use MSYS2's `/usr/bin/python3` and put `/usr/bin` on its PATH.

## Editing Seven Towers

- `seventowers/usecode/intrinsics/*.md` contains one intrinsic description per file; `intrinsics/defs/*.md` contains its signatures and game indicators.
- `seventowers/usecode/scriptop/*.md` and `directives/*.md` contain individual command and directive descriptions.
- `seventowers/usecode/reference/*.md` contains shared definitions. Insert `{{include:reference/intrinsic_params}}`, on its own line, to reuse another document. Includes are relative to `seventowers/usecode/`, omit `.md`, and fail on missing files or cycles.
- `seventowers/usecode/intrinsic-groups.json` supplies the group titles, descriptions, ordering, and related intrinsic links. `script-relations.json` supplies related script commands. Intrinsics absent from the grouping catalog still appear in the full reference.
- `seventowers/usecode/ucc_*.md` contains the standalone tutorials and language reference. Fenced `usecode` blocks and inline code are highlighted during the build.
- `seventowers/content/*.html` contains the home page, links, news, and error-page content. The corresponding JSON files supply page titles and title images. The shared page shell and navigation are generated in `tools/build-site.mjs`.
- `seventowers/content/downloads-*.json` contains the download descriptions, notices, categories, archive names, and icon entries. Archive entries are advertised even when the separately hosted snapshot files are absent from the checkout; local `seventowers/files/` archives are also supported.

Keep Markdown paragraphs on one source line. Use Markdown links, lists, tables, blockquotes for notes, and fenced code blocks. Trusted inline HTML can supply anchors and abbreviation tooltips. Use explicit `.html` destinations for new links.

The build produces individual reference pages, a reference index, combined documentation pages, assembled Markdown downloads at `seventowers/NAME.md`, and Natural Docs comment sources at `seventowers/docs/NAME.naturaldocs.txt`. All formats come from the same Markdown sources. Markdown downloads expand shared includes and preserve headings, tables, fenced code, links, and images. They sit beside the corresponding HTML pages so relative links and images resolve in either format. Existing `.uc` examples, downloadable files, images, icon thumbnails, and other documentation are copied into the published site.

Generated Markdown uses HTML `<code>` elements for inline code starting with `-`, avoiding diff detection in affected previewers. This compatibility conversion preserves the code text and leaves fenced and indented code blocks unchanged; source Markdown continues to use ordinary backticks. The Markdown intrinsic reference replaces images with their text labels, such as `[BG]` and `[Exult: SI]`, so its availability indicators do not depend on accompanying image files. The HTML reference retains its images.

Syntax highlighting uses Shiki and the vendored `seventowers/usecode.tmLanguage.json`, copied from [Exult's VS Code extension](https://github.com/exult/vscode-usecode-syntax) version 0.1.7. Its GPL-2.0-or-later license is in `seventowers/GRAMMAR-LICENSE`. To refresh the grammar, copy `syntaxes/usecode.tmLanguage.json` from that repository, update this version note, and run `npm test`. Highlighted intrinsic names link to their reference pages; strings and comments are excluded. Light and dark colors follow the site's existing system-theme preference.

## Download metadata

Seven Towers uses the same table classes, `download.js`, GitHub snapshot lookup, HTTP HEAD requests, and `shapshot_file_details.js` fallback as the main Exult download page. Download links work without JavaScript; the script refreshes metadata and can select the matching GitHub snapshot asset.

After building, refresh the static fallback with:

```sh
sh ./gen-snapshot-file-details.sh
cp shapshot_file_details.js dist/
```

This contacts SourceForge for links in `download.html` and the generated Seven Towers pages. The script also accepts explicit HTML filenames as arguments. This network step is optional for local previews and runs automatically before deployment.

## Deployment

The GitHub Actions workflow installs locked dependencies, builds and tests the site, and saves `dist/` as a `static-website` artifact. Pull requests build without deployment credentials. Pushes to `master` and manual workflow runs also refresh metadata and sync the generated directory to SourceForge.

For a manual upload after building and refreshing metadata:

```sh
rsync -az --delete \
  --filter='P */' \
  --chmod=Du=rwx,Dg=rx,Do=rx,Fu=rwX,Fg=rX,Fo=rX \
  -e "ssh -o BatchMode=yes -o PasswordAuthentication=no -i ~/.ssh/id_ed25519" \
  dist/ USER@web.sourceforge.net:/home/project-web/exult/htdocs/
```

The directory protection filter preserves destination-only directories such as separately uploaded snapshots. Build tools, source data, tests, dependencies, and PHP files are excluded by the staging file selection.

The generated `seventowers/.htaccess` supplies Apache redirects for old PHP query-string bookmarks and selects the static 404 page. These redirects require Apache `mod_rewrite` and permission to use `.htaccess`; plain static servers can serve every new page directly, but need equivalent host redirect rules to preserve old bookmarks. A static `404.shtml` is also generated for hosts still configured to use that error-document filename.

**Please do not edit the webspace directly.** Edit sources in Git and rebuild.
