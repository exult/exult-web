[![CodeFactor](https://www.codefactor.io/repository/github/exult/exult-web/badge)](https://www.codefactor.io/repository/github/exult/exult-web)

Quick and dirty guide to our Web-Git
----

- checkout this repository

- change/add stuff there

- commit changes to Git

- in a terminal shell, regenerate the snapshot download metadata:
    ```
    sh ./gen-snapshot-file-details.sh
    ```

- sync the checked out website to Exult web space with
    ```
    rsync -az --delete \
      --exclude=.git/ \
      --filter='P */' \
      --chmod=Du=rwx,Dg=rx,Do=rx,Fu=rwX,Fg=rX,Fo=rX \
      -e "ssh -o BatchMode=yes -o PasswordAuthentication=no -i ~/.ssh/id_ed25519" \
      ./ USER@web.sourceforge.net:/home/project-web/exult/htdocs/
    ```

This updates `/home/project-web/exult/htdocs` with the latest Git version, deletes removed files while preserving destination-only subdirectories, and sets the correct permissions during upload.

# **Please do not edit the webspace directly.**
